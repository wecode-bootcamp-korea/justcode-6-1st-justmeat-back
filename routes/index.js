const express = require('express');
const router = express.Router();

const userrouter = require("../routes/userrouter");
const productrouter = require('./productrouter');
const cartrouter = require("../routes/cartroute");

router.use('/user', "/", userrouter);
router.use("/product", productrouter);
router.use('/cart', cartrouter);

module.exports = router;
