const sale = require("../models/saledao");

const createSale = async (userId) => {
  return await sale.checkPoint(userId)
}

// const updateSale = async (userId) => {
//   return await sale.checkPoint(userId)
// }

// const deleteCart = async (userId) => {
//   return await sale.deleteCart(userId)
// }

module.exports = { createSale, }
  // updateSale, }
  //  deleteCart }

