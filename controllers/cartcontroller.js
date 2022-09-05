const cart = require("../services/cartservice");
// 추가추가
const createOrUpdateCart = async (req, res) => {
  const { userId, productId, productAmount } = req.body;

  try {
    const checkcart = await cart.checkCart(userId, productId, productAmount)
    res.status(201).json({ message: "createdCart or updateCart" })
  }
  catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json(err.message)
  }
};

const createCart = async (req, res) => {
  const { userId, productId, productAmount } = req.body;
  const hasKey = { userId: false, productId: false, productAmount: false };
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
    await cart.createCart(userId, productId, productAmount);
    res.status(201).json({ message: 'cartCreated' });
  }
  catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json(err.message)
  }
};

const updateCart = async (req, res) => {
  //const userId = req.params.userId
  const { userId, productId, productAmount } = req.body;

  try {
    const GETcart = await cart.updateCart(userId, productId, productAmount);
    res.status(201).json({ message: 'updateCart' });
  }
  catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json(err.message)
  }
};

const deleteCart = async (req, res) => {
  const pk = req.params.pk;

  try {
    await cart.deleteCart(pk)
    res.status(201).json({ message: "Deleted Cart" });
  }
  catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json(err.message)
  }
};

const readCart = async (req, res) => {

  const userId = req.params.userId;

  try {
    const GETcart = await cart.readCart(userId)
    res.status(201).json({ "data": GETcart })
  }
  catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json(err.message)
  }
};

module.exports = { createCart, updateCart, deleteCart, readCart, createOrUpdateCart };
