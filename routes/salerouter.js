const express = require('express');
const router = express.Router();

const salecontroller = require("../controllers/salecontroller");

router.post('/', salecontroller.createSale);

module.exports = router;
