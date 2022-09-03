const express = require("express");
const productcontroller = require("../controllers/productcontroller");
const router = express.Router();

router.get("/", productcontroller.getBestItems); //best6
router.post("/:categoryId", productcontroller.getItemsByCategories); //쇼핑하기 카테고리별 페이지
router.post("/", productcontroller.getProductDetails); //상세페이지 + 상세페이지 이미지 



module.exports = router;