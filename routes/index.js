const express = require('express');
const router = express.Router();

const userrouter = require("../routes/userrouter");

const productrouter = require('./productrouter');
const cartrouter = require("../routes/cartrouter");
const salerouter = require("../routes/salerouter");
const eventrouter = require("../routes/eventrouter");

router.use('/user', userrouter);
router.use("/product", productrouter);
router.use('/cart', cartrouter);
router.use('/sale', salerouter);
router.use('/event', eventrouter);

module.exports = router;