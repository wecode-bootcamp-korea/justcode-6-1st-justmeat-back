const sale = require("../services/saleservice");

const createSale = async (req, res) => {
  const userId = req.params.userId;

  try {
    await sale.createSale(userId)
    //await sale.updateSale(userId)
    // await sale.deleteCart(userId)
    res.status(200).json({ message: "구매가 완료 되었습니다. 신선한 상품으로 배송해드리겠습니다" })
  }
  catch (err) {
    console.log(err)
    res.status(err.statusCode || 500).json(err.message)
  }
};

module.exports = { createSale }

