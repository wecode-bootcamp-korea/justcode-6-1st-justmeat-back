const { setRandomFallback } = require("bcryptjs");
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

const createUser = async (email, hashedPw, name, phone) => {
  return await myDataSource.query(`
  INSERT INTO users(email, password,name,phone)
  VALUES(?,?,?,?)
  `, [email, hashedPw, name, phone]);
}

const readUserByEmail1 = async (email) => {
  const [user] = await myDataSource.query(`
  SELECT email
  FROM users
  WHERE email = ?
  `, [email]);
  return user
}

const confirmNum = async (phone) => {
  const [user] = await myDataSource.query(`
  SELECT phone
  FROM users
  WHERE phone = ?
  `, [phone]);
  return user
}

const login = async (email) => {
  const [user] = await myDataSource.query(`
  SELECT id, email, password
  FROM users
  WHERE email = ?
  `, [email]);
  return user
}

module.exports = { createUser, readUserByEmail1, confirmNum, login };

