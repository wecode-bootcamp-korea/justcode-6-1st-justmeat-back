const sale = require("../services/saleservice");

const createSale = async (req, res) => {
  const userId = req.params.userId;

  try {
    const pass = await sale.pointCheck(userId);

    if (pass) {
      await sale.createSale(userId)
      await sale.updateProduct(userId)
      await sale.deleteCart(userId)
      res.status(201).json({ message: "구매가 완료 되었습니다. 신선한 상품으로 배송해드리겠습니다" })
    } else {
      res.status(500).json({ message: "Point가 없습니다. 구매에 실패하셨습니다." })
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


