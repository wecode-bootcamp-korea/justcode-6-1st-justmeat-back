const cart = require("../services/cartservice");

const createCart = async (req, res) => {
  const { userId, productId, productAmount, paymentAmount } = req.body;
  const hasKey = { userId: false, productId: false, productAmount: false, paymentAmount: false };
  const requireKey = Object.keys(hasKey);

  Object.entries(req.body).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value) {
      hasKey[key] = true;
    }
  })
  const hasKeyArray = Object.entries(hasKey);
  for (let i = 0; i < hasKeyArray.length; i++) {
    const [key, value] = hasKeyArray[i];
    if (!value) {
      res.status(400).json({ message: `${key}이/가 없습니다.` });
      return;
    }
  }

  try {
    await cart.createCart(userId, productId, productAmount, paymentAmount);
    res.status(201).json({ message: 'cartCreated' });
  }
  catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json(err.message)
  }
};

const updateCart = async (req, res) => {
  const { userId, productId, productAmount, paymentAmount } = req.body;

  try {
    await cart.updateCart(userId, productId, productAmount, paymentAmount);
    res.status(201).json({ message: 'updateCart' });
  }
  catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json(err.message)
  }
}

const deleteCart = async (req, res) => {
  const pk = req.params.pk;

  try {
    await cart.deleteCart(pk)
    res.status(204).json({ message: "Deleted Cart" });
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error deleted Cart" })
  }

}
module.exports = { createCart, updateCart, deleteCart };
