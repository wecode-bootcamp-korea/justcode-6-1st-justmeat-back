const sale = require("../models/saledao");

const createSale = async (userId) => {
  return await sale.createSale(userId)
}

const readSale = async (userId) => {
  return await sale.readSaleByUser(userId)
}

const updateProduct = async (userId) => {
  return await sale.updateProduct(userId)
}

const deleteCart = async (userId) => {
  return await sale.deleteCart(userId)
}
// const updateSale = async (userId) => {
//   return await sale.checkPoint(userId)
// }

// const deleteCart = async (userId) => {
//   return await sale.deleteCart(userId)
// }

module.exports = { createSale, readSale, updateProduct, deleteCart }
  // updateSale, }
  //  deleteCart }

