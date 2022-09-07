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
    res.status(201).json({ itemData });
  }
  catch(err){
    res.status(err.status || 500).json({message: err.message});
  }
}

const getProductDetails = async (req, res) => {
  const productId = req.query.id;
  try {
    const itemData = await productservice.getProductDetails(productId);
    res.status(201).json({ itemData });
  } catch(err) {
    res.status(err.status || 500).json({message: err.message});
  }
}

const getProductReview = async (req, res) => {
  const productId = req.params.id;
  try {
    const itemData = await productservice.getProductReview(productId);
    res.status(201).json({itemData});
  } catch {
    res.status(500).json({message: "ERROR"});
  }
}

const createProductReview = async (req, res) => {
  const { productId, userId, title, content, reviewImg } = req.query;
  const hasKey = { title: false, content: false };
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
      res.status(400).json({ message: `CANNOT FOUND ${key}` });
      return;
    }
  }
  
  try {
    const itemData = await productservice.createProductReview(productId, userId, title, content, reviewImg);
    res.status(201).json({itemData});
  } catch(err) {
    res.status(err.status || 500).json({message: err.message});
  }
}

  module.exports = {
    getBestItems,
    getItemsByCategories,
    getProductDetails,
    getProductReview,
    createProductReview,
  };