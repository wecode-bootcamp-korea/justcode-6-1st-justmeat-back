const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database initiate fail");
  });


const createCart = async (userId, productId, productAmount) => {
  const productprice = await myDataSource.query(`
    SELECT price FROM products WHERE products.id = ?
  `, [productId]);
  const result = productprice[0].price;

  await myDataSource.query(`
  INSERT INTO cart_lists(userId, productId, productAmount, paymentAmount)
  VALUES(?,?,?,?)
`, [userId, productId, productAmount, result * productAmount]);
}

const updateCart = async (userId, productId, productAmount) => {

  const productprice = await myDataSource.query(`
    SELECT price FROM products WHERE products.id = ?
   `, [productId]);
  const result = productprice[0].price;

  await myDataSource.query(`
  UPDATE cart_lists
  SET productAmount = ?, paymentAmount = ?
  WHERE userId = ? AND productId = ?;
  `, [productAmount, productAmount * result, userId, productId]);
  return
}

const deleteCart = async (id) => {
  return myDataSource.query(`
  DELETE FROM cart_lists
  WHERE id =?
  `, [id])
}

const readCart = async (userId) => {
  const GETcart = await myDataSource.query(`
  SELECT * from cart_lists
  INNER JOIN products on cart_lists.productId = products.id where cart_lists.userId = ?;
  `, [userId])
  return GETcart;
}

// 추가추가
const checkCart = async (userId, productId, productAmount) => {
  // cart_lists에 값이 담겨져 있는지 체크하는 구문
  const cart = await myDataSource.query(`
  SELECT * FROM cart_lists where userId = ? and productId = ?
  `, [userId, productId]);

  // cart_lists에 값이 담겨져 있으면 updateCart(); 실행, 값이 없으면 createCart();
  return cart.length > 0 ? await updateCart(userId, productId, productAmount) : await createCart(userId, productId, productAmount);
}

module.exports = { createCart, updateCart, deleteCart, readCart, checkCart };
