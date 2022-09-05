const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const user = require("../models/userdao");

const createUser = async (email, password, name, phone) => {

  const salt = bcrypt.genSaltSync();
  const hashedPw = bcrypt.hashSync(password, salt)

  return await user.createUser(email, hashedPw, name, phone)
}

const createUser1 = async (email) => {
  return await user.readUserByEmail1(email)
}

const existedphone = async (phone) => {
  return await user.confirmNum(phone)
};

const login = async (email, password) => {
  const userd = await user.login(email)

  if (!userd) {
    const error = new Error("NO_USER")
    error.statusCode = 400
    throw error
  }

  const isPasswordCorrect = bcrypt.compareSync(password, userd.password)
  if (!isPasswordCorrect) {
    const error = new Error("INVALID PASSWORD")
    error.statusCode = 400
    throw error
  }

  if (userd.email && isPasswordCorrect) {
    const token = jwt.sign({ email: userd.email }, 'secretKey') //process.env.secretKey
    return token;
  }
}

module.exports = { createUser, createUser1, existedphone, login };
