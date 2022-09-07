const { DataSource, Table } = require("typeorm");

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

const checkCart = async (userId) => {
  // cart_lists에 값이 담겨져 있는지 체크하는 구문
  const cart = await myDataSource.query(`
  SELECT * FROM cart_lists where userId = ?
  `, [userId]);
  if (cart.length > 0) { return true; } else { false; }
}

const createSale = async (userId) => {
  return await myDataSource.query(`
  INSERT INTO sales (userId, productId, productAmount, paymentAmount)
  SELECT userId, productId, productAmount, paymentAmount 
  FROM cart_lists
  WHERE cart_lists.userId = ?
  `, [userId])
}

const readSaleByUser = async (userId) => {
  const sale = await myDataSource.query(`
    SELECT
    sales.id,
    sales.userId,
    sales.productId,
    sales.productAmount,
    sales.paymentAmount,
    products.productImgMain,
    products.productName,
    products.productOption
  FROM sales 
  JOIN justmeat.products ON products.id = sales.productId
  WHERE sales.userId = ?
    `, [userId])
  return sale;
}

const updateProduct = async (userId) => {
  const productid = await myDataSource.query(`
    SELECT stock, salesAmount FROM products
  INNER JOIN sales on sales.productId = products.id where sales.userId = ?;
    `, [userId]);

  const stockcheck = await myDataSource.query(`
    SELECT productAmount FROM cart_lists
    INNER JOIN products on products.id = cart_lists.productId where cart_lists.userId = ?
    `, [userId]);
  const pa = stockcheck[0].productAmount;


  for (let i = 0; i < productid.length; i++) {
    const stockproduct = productid[i].stock
    const salesAmountproduct = productid[i].salesAmount

    if (stockproduct > 0 && stockproduct > pa) {
      const saleAmount = await myDataSource.query(`
  SELECT productId, productAmount FROM sales
  where sales.userId = ?`, [userId])

      for (let j = 0; j < saleAmount.length; j++) {
        const result = await myDataSource.query(`
  UPDATE products
  SET stock = ?, salesAmount = ?
  WHERE id = ?;
  `, [stockproduct - saleAmount[j].productAmount, salesAmountproduct + saleAmount[j].productAmount, saleAmount[j].productId])
      }
      return true;
    }
    else { return false; }
  }
}

const deleteCart = async (userId) => {
  return await myDataSource.query(`
  DELETE FROM cart_lists
  WHERE userId =?
  `, [userId])
}
//sales 합계
const pointCheck = async (userId) => {

  const sumpay = await myDataSource.query(`
  SELECT SUM(paymentAmount) as tA FROM cart_lists
  WHERE userId = ?
  `, [userId]);
  const salespay = Number(sumpay[0].tA)

  // user의 포인트
  const result = await myDataSource.query(`
  SELECT point FROM users
  WHERE id = ?
  `, [userId]);
  const remainingPoint = result[0].point

  if (remainingPoint > salespay) {
    await myDataSource.query(`
  UPDATE users
  SET point = ?
  WHERE id = ?
  `, [remainingPoint - salespay, userId])
    return true;
  } else {
    return false;
  }
}
module.exports = { createSale, readSaleByUser, updateProduct, deleteCart, pointCheck, checkCart }