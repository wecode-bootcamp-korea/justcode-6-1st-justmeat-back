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
  let getProductReviewByProductId = productdao.getProductReviewByProductId(productId);
  const { userId } = getProductReviewByProductId;
  let getSalesProductCount = productdao.getSalesProductCount(userId, productId);

  return await result;

}

const createProductReview = async (productId, userId, title, content, reviewImg) => {
  return await productdao.createProductReview(productId, userId, title, content, reviewImg);
}

module.exports = {
  getBestItems,
  getItemsByCategories,
  getProductDetails,
  getProductReview,
  createProductReview,  
}