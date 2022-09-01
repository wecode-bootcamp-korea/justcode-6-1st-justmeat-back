const express = require('express');
const router = express.Router();

const userrouter = require("../routes/userrouter");
const cartrouter = require("../routes/cartroute");

router.use('/user', userrouter);
router.use('/cart', cartrouter);

module.exports = router;
