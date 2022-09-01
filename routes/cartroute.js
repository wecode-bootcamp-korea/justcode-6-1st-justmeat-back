const express = require('express');
const router = express.Router();

const cartcontroller = require("../controllers/cartcontroller");

router.post('', cartcontroller.createcart);

module.exports = router;
