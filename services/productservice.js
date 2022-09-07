const productdao = require("../models/productdao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const getBestItems = async () => {
  return await productdao.getBestItems();
};

const getItemsByCategories = async (categoryId) => {
  const result = await productdao.getItemsByCategories(categoryId);
  if (!result.length) {
    const error = new Error("THE CATEGORY YOU REQUESTED DOES NOT EXIST.")
    error.status = 400;
    throw error;
  } else {
    return result;
  }
}

const getProductDetails = async (productId) => {
  const result = await productdao.getProductDetails(productId);
  if (!result.length) {
    const error = new Error("THE PRODUCT YOU REQUESTED DOES NOT EXIST.")
    error.status = 400;
    throw error;
  } else {
    return result;
  }
}

const getProductReview = async (productId) => {
  return await productdao.getProductReviewByProductId(productId);
}

const createProductReview = async (productId, userId, title, content, reviewImg) => {
  const count = productdao.findPurchaseRecordOfUser(productId);
  if (!count) {
    const error = new Error("YOU CANNOT REVIEW THE PRODUCT YOU NEVER BOUGHT.")
    error.status = 400;
    throw error;
  } else {
    return await productdao.createProductReview(productId, userId, title, content, reviewImg);
  }
}

module.exports = {
  getBestItems,
  getItemsByCategories,
  getProductDetails,
  getProductReview,
  createProductReview,
}