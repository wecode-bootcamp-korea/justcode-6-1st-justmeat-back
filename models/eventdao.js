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

  const getEventList = async () => {
    return await myDataSource.query(
        `SELECT id, titleImg, title, content, subtitle, DATE_FORMAT(createdAt, '%Y-%m-%d')as createdat FROM event;`
    );
  }

  const getEventDetail = async (id) => {
    return await myDataSource.query(
        `SELECT * FROM justmeat.event WHERE id = ?;`, id);
  }


  module.exports = {
    getEventList,
    getEventDetail,
  };