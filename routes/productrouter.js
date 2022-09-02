const express = require("express");
const productcontroller = require("../controllers/productcontroller");
const router = express.Router();

router.get("/best", productcontroller.getBestItems); //best6

module.exports = router;