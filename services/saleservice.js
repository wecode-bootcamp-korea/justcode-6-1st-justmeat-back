const sale = require("../models/saledao");

const checkCart = async (userId) => {
  return await sale.checkCart(userId);
}

const createSale = async (userId) => {
  return await sale.createSale(userId)
}

const updateProduct = async (userId) => {
  const result =
    await sale.updateProduct(userId)
  if (result === false) {
    const error = new Error("상품 재고가 부족합니다")
    error.statusCode = 403
    throw error
  }
}

const pointCheck = async (userId) => {
  const result =
    await sale.pointCheck(userId)
  if (result === false) {
    const error = new Error("Point가 부족합니다. 구매에 실패하셨습니다.")
    error.statusCode = 403
    throw error
  }
}

const deleteCart = async (userId) => {
  return await sale.deleteCart(userId)
}

const readSale = async (userId) => {
  return await sale.readSaleByUser(userId)
}

module.exports = { createSale, readSale, updateProduct, deleteCart, pointCheck, checkCart }


