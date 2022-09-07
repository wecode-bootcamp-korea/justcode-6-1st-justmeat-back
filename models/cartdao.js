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


const createCart = async (userId, productId, productAmount, paymentAmount) => {
  // const productprice = await myDataSource.query(`
  //   SELECT price FROM products WHERE products.id = ?
  // `, [productId]);
  // const result = productprice[0].price;

  await myDataSource.query(`
  INSERT INTO cart_lists(userId, productId, productAmount, paymentAmount)
  VALUES(?,?,?,?)
`, [userId, productId, productAmount, paymentAmount]);
  //result * productAmount]);
}

const updateCart = async (userId, productId, productAmount, paymentAmount) => {

  // const productprice = await myDataSource.query(`
  //   SELECT price FROM products WHERE products.id = ?
  //  `, [productId]);
  // const result = productprice[0].price;

  await myDataSource.query(`
  UPDATE cart_lists
  SET productAmount = ?, paymentAmount = ?
  WHERE userId = ? AND productId = ?;
  `, [productAmount, paymentAmount, userId, productId]);
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
  SELECT
  cart_lists.id,
  cart_lists.userId,
  cart_lists.productId,
  cart_lists.productAmount,
  cart_lists.paymentAmount,
  products.productImgMain,
  products.productName,
  products.price,
  products.weight
  FROM cart_lists
  JOIN justmeat.products ON products.id = cart_lists.productId
  WHERE cart_lists.userId = ?
  `, [userId])
  return GETcart;
}

// 추가추가
const checkCart = async (userId, productId, productAmount, paymentAmount) => {
  // cart_lists에 값이 담겨져 있는지 체크하는 구문
  const cart = await myDataSource.query(`
  SELECT * FROM cart_lists where userId = ? and productId = ?
  `, [userId, productId]);

  // cart_lists에 값이 담겨져 있으면 updateCart(); 실행, 값이 없으면 createCart();
  return cart.length > 0 ? await updateCart(userId, productId, productAmount, paymentAmount) : await createCart(userId, productId, productAmount, paymentAmount);
}

module.exports = { createCart, updateCart, deleteCart, readCart, checkCart };
