const productdao = require("../models/productdao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const getBestItems = async () => {
  return await productdao.getBestItems();
};

const getItemsByCategories = async (categoryId) => {
  return await productdao.getItemsByCategories(categoryId);
}

const getProductDetails = async (productId) => {
  return await productdao.getProductDetails(productId);
}

const getProductReview = async (productId) => {
  return await productdao.getProductReview(productId);
}

const createProductReview = async (productId, userId, title, content) => {
  return await productdao.createProductReview(productId, userId, title, content);
}

module.exports = {
  getBestItems,
  getItemsByCategories,
  getProductDetails,
  getProductReview,
  createProductReview,  
}