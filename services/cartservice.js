const cart = require("../models/cartdao");

const createCart = async (userId, productId, productAmount) => {
  return await cart.createCart(userId, productId, productAmount);
}

const updateCart = async (userId, productId, productAmount) => {
  return await cart.updateCart(userId, productId, productAmount);
}

const deleteCart = async (pk) => {
  return await cart.deleteCart(pk);
}

const readCart = async (userId) => {
  return await cart.readCart(userId);
}

// 추가추가
const checkCart = async (userId, productId, productAmount) => {
  return await cart.checkCart(userId, productId, productAmount);
}

module.exports = { createCart, updateCart, deleteCart, readCart, checkCart };
