const express = require("express");
const productcontroller = require("../controllers/productcontroller");
const router = express.Router();

router.get("/", productcontroller.getBestItems); //best6
router.post("/:categoryId", productcontroller.getItemsByCategories); 


module.exports = router;