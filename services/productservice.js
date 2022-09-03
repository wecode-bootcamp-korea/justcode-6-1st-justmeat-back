const productdao = require("../models/productdao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const getBestItems = async () => {
  return await productdao.getBestItems();
};

const getItemsByCategories = async (categoryId) => {
  return await productdao.getItemsByCategories(categoryId);
}

module.exports = {
  getBestItems,
  getItemsByCategories,  
}