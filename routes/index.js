const express = require('express');
const router = express.Router();

const userrouter = require("../routes/userrouter");
const cartrouter = require("../routes/cartrouter");
const salerouter = require("../routes/salerouter");

router.use('/user', userrouter);
router.use('/cart', cartrouter);
router.use('/sale', salerouter);

module.exports = router;
