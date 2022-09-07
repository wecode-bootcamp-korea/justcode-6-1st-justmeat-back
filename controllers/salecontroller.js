const sale = require("../services/saleservice");

const createSale = async (req, res) => {
  const userId = req.params.userId;

  try {
    const pass = await sale.checkCart(userId)

    if (pass) {
      await sale.updateProduct(userId)
      await sale.pointCheck(userId)
      await sale.createSale(userId)
      await sale.deleteCart(userId)
      res.status(201).json({ message: "구매가 완료 되었습니다. 신선한 상품으로 배송해드리겠습니다" })
    }
    else {
      res.status(400).json({ message: "카트가 비어있습니다" })
    }
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

module.exports = { createSale, readSale }