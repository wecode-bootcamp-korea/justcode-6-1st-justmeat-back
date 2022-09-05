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

const checkPoint = async (userId) => {
  try {
    const userPoint = await myDataSource.query(`
  SELECT point FROM users WHERE id = ?
  `, [userId]);
    return Number(userPoint[0].point) > 0 ? await createSale(userId) &&
      await deleteCart(userId) && await updateUserPoint(userId) &&
      await updateProducts(userId) : res.status(401).json({ message: "no point" })
  }
  catch (err) {
    console.log(err)
    throw err
  }
}
const createSale = async (userId) => {
  await myDataSource.query(`
  INSERT INTO sales(userId, productId, productAmount, paymentAmount)
  SELECT userId, productId, productAmount, paymentAmount 
  FROM cart_lists
  WHERE userId = ?
`, [userId]);
}

const updateUserPoint = async (userId) => {
  const [saleData] = await myDataSource.query(`
     SELECT paymentAmount 
     FROM cart_lists 
     WHERE userId = ?
  `, [userId]);
  // //const user = saleData[0].userId;
  const pay = saleData.paymentAmount;

  const [userPoint] = await myDataSource.query(`
  SELECT point FROM users WHERE id = ?
  `, [userId]);

  const userPointUpdate = userPoint.point
  await myDataSource.query(`
  UPDATE users
  SET point = ?
  WHERE id = ?
  `, [userPointUpdate - pay, userId]);
}

const deleteCart = async (userId) => {
  await myDataSource.query(`
  DELETE FROM cart_lists
  WHERE userId =? 
  `, [userId])
}

const updateProducts = async (userId) => {
  const [productId] = await myDataSource.query(`
  SELECT producId FROM sales WHERE userId = ?`, [userId])
  const product = productId.productId

  return await myDaySource.query(`
  UPDATE products, sales
  SET products.stock = products.stock - sales.productAmount , products.salesAmount = products.salesAmount + sales.productAmount
  WHERE ? = sales.productId`,
    [product])
}


module.exports = { createSale, updateUserPoint, checkPoint, deleteCart, updateProducts }