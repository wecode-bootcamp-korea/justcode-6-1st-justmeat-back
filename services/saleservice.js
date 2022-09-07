const sale = require("../models/saledao");

const createSale = async (userId) => {
  return await sale.createSale(userId)
}
const updateProduct = async (userId) => {
  await sale.updateProduct(userId)
  return res.status(400).json({ message: " 재고가 부족합니다 " })
}

const pointCheck = async (userId) => {
  await sale.pointCheck(userId)
  res.status(400).json({ message: " 포인트가 부족합니다 " })
}

const deleteCart = async (userId) => {
  await sale.deleteCart(userId)
  return res.status(err.statusCode || 500).json(err.message)
}

const readSale = async (userId) => {
  return await sale.readSaleByUser(userId)
}

module.exports = { createSale, readSale, updateProduct, deleteCart, pointCheck }


