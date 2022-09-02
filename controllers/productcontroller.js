const productservice = require("../services/productservice");

const getBestItems = async (req, res) => {
  try {
    console.log(req.headers.jwttoken);
    const bestItems = await productservice.getBestItems();
    res.status(201).json({ itemData: bestItems });
  } catch {
    res.status(500).json({ message: "CANNOT FIND RESULT OF BEST6" });
  }
};

  module.exports = {
    getBestItems,
  };