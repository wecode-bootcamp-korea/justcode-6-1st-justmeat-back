const cart = require("../models/cartdao");

const createCart = async (userId, productId, productAmount, paymentAmount) => {
  return await cart.createCart(userId, productId, productAmount, paymentAmount)
}

module.exports = { createCart };
