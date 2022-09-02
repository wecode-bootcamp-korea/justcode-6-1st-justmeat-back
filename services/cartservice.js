const cart = require("../models/cartdao");

const createCart = async (userId, productId, productAmount, paymentAmount) => {
  return await cart.createCart(userId, productId, productAmount, paymentAmount);
}

const updateCart = async (userId, productId, productAmount, paymentAmount) => {
  return await cart.updateCart(userId, productId, productAmount, paymentAmount);
}

const deleteCart = async (pk) => {
  return await cart.deleteCart(pk);
}

const readCart = async (userId) => {
  return await cart.readCart(userId);
}

// 추가추가
const checkCart = async (userId, productId, productAmount, productPrice) => {
  return await cart.checkCart(userId, productId, productAmount, productPrice);
}

module.exports = { createCart, updateCart, deleteCart, readCart, checkCart };
