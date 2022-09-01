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
  return await myDataSource.query(`
  INSERT INTO cart_lists (userId, productId, productAmount, paymentAmount)
  VALUES(?,?,?,?)
  `, [userId, productId, productAmount, paymentAmount]);
}

const updateCart = async (userId, productId, productAmount, paymentAmount) => {
  console.log("payment", paymentAmount)
  const cart = await myDataSource.query(`
  UPDATE cart_lists
  SET productAmount = ?, paymentAmount = ?
  WHERE userId = ? AND productId = ?;
  `, [productAmount, paymentAmount, userId, productId]);
  return cart;
}

const deleteCart = async (pk) => {
  await myDataSource.query(`
  DELETE FROM cart_lists
  WHERE id =?
  `, [pk])
}

module.exports = { createCart, updateCart, deleteCart };
