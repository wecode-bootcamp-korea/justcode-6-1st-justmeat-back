const productservice = require("../services/productservice");

const getBestItems = async (req, res) => {
  try {
    const itemData = await productservice.getBestItems();
    res.status(201).json({ itemData });
  } catch {
    res.status(500).json({ message: "ERROR" });
  }
};

const getItemsByCategories = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const itemData = await productservice.getItemsByCategories(categoryId);
    res.status(201).json({ itemData })
  }
  catch{
    res.status(500).json({ message: "ERORR"})
  }
}

const getProductDetails = async (req, res) => {
  const productId = req.query.id;
  try {
    const itemData = await productservice.getProductDetails(productId);
    res.status(201).json({ itemData });
  } catch {
    res.status(500).json({ message: "ERROR"});
  }
}

const getProductReview = async (req, res) => {
  const productId = req.query.id;
  try {
    const itemData = await productservice.getProductReview(productId);
    res.status(201).json({itemData});
  } catch {
    res.status(500).json({message: "ERROR"});
  }
}

const createProductReview = async (req, res) => {
  const { productId, userId, title, content, reviewImg } = req.query;
  try {
    const itemData = await productservice.createProductReview(productId, userId, title, content, reviewImg);
    res.status(201).json({itemData});
  } catch {
    res.status(500).json({message: "ERROR"});
  }
}

  module.exports = {
    getBestItems,
    getItemsByCategories,
    getProductDetails,
    getProductReview,
    createProductReview,
  };