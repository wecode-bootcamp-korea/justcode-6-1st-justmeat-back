const cart = require("../models/cartdao");

const createCart = async (userId, productId, productAmount, paymentAmount) => {
  return await cart.createCart(userId, productId, productAmount, paymentAmount);
}

const updateCart = async (userId, productId, productAmount, paymentAmount) => {
  return await cart.updateCart(userId, productId, productAmount, paymentAmount);
}

const deleteCart = async (id) => {
  return await cart.deleteCart(id);
}

const readCart = async (userId) => {
  return await cart.readCart(userId);
}

// 추가추가
const checkCart = async (userId, productId, productAmount, paymentAmount) => {
  return await cart.checkCart(userId, productId, productAmount, paymentAmount);
}

module.exports = { createCart, updateCart, deleteCart, readCart, checkCart };
