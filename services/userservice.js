const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const user = require("../models/userDao");

const createUser = async (email, password, name, phone) => {

  const salt = bcrypt.genSaltSync();
  const hashedPw = bcrypt.hashSync(password, salt)

  return await user.createUser(email, hashedPw, name, phone)
}

const createUser1 = async (email) => {
  return await user.readUserByEmail1(email)
}


const login = async (email, password) => {

  const user = await user.readUserByEmail(email)

  const isPasswordCorrect = bcrypt.compareSync(password, user.password)

  if (user && isPasswordCorrect) {
    const token = jwt.sign({ email: user.email }, 'secretKey') //process.env.secretKey
    return token;
  }
}

module.exports = { createUser, createUser1, login };
