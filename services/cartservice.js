const cart = require("../models/cartdao");

const createCart = async (userId, productId, productAmount, paymentAmount) => {
  return await cart.createCart(userId, productId, productAmount, paymentAmount)
}

const updateCart = async (userId, productId, productAmount, paymentAmount) => {
  return await cart.updateCart(userId, productId, productAmount, paymentAmount)
}

const deleteCart = async (pk) => {
  return await cart.deleteCart(pk)
}

module.exports = { createCart, updateCart, deleteCart };
