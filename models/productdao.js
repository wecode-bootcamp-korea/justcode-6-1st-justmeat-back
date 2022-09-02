const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
})

myDataSource.initialize()
.then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch(() => {
    console.log("failed to initialize!");
  });

// 베스트 상품 6
const getBestItems = async () => {
  return await myDataSource.query(
    `SELECT * FROM justmeat.products order by salesAmount desc LIMIT 6;`);
};

module.exports = {
  getBestItems
};