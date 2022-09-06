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
  SELECT sum (paymentAmount) as tA FROM cart_lists
  WHERE userId = ?
  `, [userId]);
  const salespay = sumpay[0].tA

  // user의 포인트
  const result = await myDataSource.query(`
  SELECT point FROM users
  WHERE userId = ?
  `, [userId]);
  const remainingPoint = result[0].point

  return remainingPoint > salespay ? await createSale(userId)
    && await updateProduct(userId) && await deleteCart
    : res.status(201).json({ message: "No remain Point" })
}


module.exports = { createSale, readSaleByUser, updateProduct, deleteCart, pointCheck }

// const checkPoint = async (userId) => {
//   try {
//     const userPoint = await myDataSource.query(`
//   SELECT point FROM users WHERE id = ?
//   `, [userId]);
//     return Number(userPoint[0].point) > 0 ? await createSale(userId) &&
//       await deleteCart(userId) && await updateUserPoint(userId) &&
//       await updateProducts(userId) : res.status(401).json({ message: "no point" })
//   }
//   catch (err) {
//     console.log(err)
//     throw err
//   }
// }
// const createSale = async (userId) => {
//   await myDataSource.query(`
//   INSERT INTO sales(userId, productId, productAmount, paymentAmount)
//   SELECT userId, productId, productAmount, paymentAmount 
//   FROM cart_lists
//   WHERE userId = ?
// `, [userId]);
// }

// const updateUserPoint = async (userId) => {
//   const [saleData] = await myDataSource.query(`
//      SELECT paymentAmount 
//      FROM cart_lists 
//      WHERE userId = ?
//   `, [userId]);
//   // //const user = saleData[0].userId;
//   const pay = saleData.paymentAmount;

//   const [userPoint] = await myDataSource.query(`
//   SELECT point FROM users WHERE id = ?
//   `, [userId]);

//   const userPointUpdate = userPoint.point
//   await myDataSource.query(`
//   UPDATE users
//   SET point = ?
//   WHERE id = ?
//   `, [userPointUpdate - pay, userId]);
// }

// const deleteCart = async (userId) => {
//   await myDataSource.query(`
//   DELETE FROM cart_lists
//   WHERE userId =? 
//   `, [userId])
// }

// const updateProducts = async (userId) => {
//   const [productId] = await myDataSource.query(`
//   SELECT producId FROM sales WHERE userId = ?`, [userId])
//   const product = productId.productId

//   return await myDaySource.query(`
//   UPDATE products, sales
//   SET products.stock = products.stock - sales.productAmount , products.salesAmount = products.salesAmount + sales.productAmount
//   WHERE ? = sales.productId`,
//     [product])
// }


// module.exports = { createSale, updateUserPoint, checkPoint, deleteCart, updateProducts }