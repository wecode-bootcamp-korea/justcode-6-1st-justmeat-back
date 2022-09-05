const sale = require("../services/saleservice");

const createSale = async (req, res) => {
  const userId = req.params.userId;

  try {
    await sale.createSale(userId)
    await sale.updateProduct(userId)
    await sale.deleteCart(userId)
    res.status(201).json({ message: "구매가 완료 되었습니다. 신선한 상품으로 배송해드리겠습니다" })
  }
  catch (err) {
    console.log(err)
    res.status(err.statusCode || 500).json(err.message)
  }
};

const readSale = async (req, res) => {
  const userId = req.params.userId;

  try {
    const readSale = await sale.readSale(userId)
    res.status(201).json({ "data": readSale })
  }
  catch (err) {
    console.log(err)
    res.status(err.statusCode || 500).json(err.message)
  }
}

// const updateProduct = async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     await sale.updateProduct(userId)
//     res.status(201).json({ message: "updateProduct" })
//   }
//   catch (err) {
//     console.log(err)
//     res.status(err.statusCode || 500).json(err.message)
//   }
// }

module.exports = { createSale, readSale }
//  updateProduct }

