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
    SELECT * FROM sales WHERE userId = ?
    `, [userId])
  return sale;
}

const updateProduct = async (userId) => {
  const productid = await myDataSource.query(`
    SELECT stock, salesAmount FROM products
  INNER JOIN sales on sales.productId = products.id where sales.userId = ?;
    `, [userId]);
  for (let i = 0; i < productid.length; i++) {
    const stockproduct = productid[i].stock
    const salesAmountproduct = productid[i].salesAmount

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
    console.log(remainingPoint - salespay)
    return;
  } else {
    return;
  }
}
module.exports = { createSale, readSaleByUser, updateProduct, deleteCart, pointCheck }