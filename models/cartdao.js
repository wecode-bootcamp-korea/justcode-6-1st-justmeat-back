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
  INSERT INTO cart_list (userId, productId, productAmount, paymentAmount)
  VALUES(?,?,?,?)
  `, [userId, productId, productAmount, paymentAmount]);
}

module.exports = { createCart };
