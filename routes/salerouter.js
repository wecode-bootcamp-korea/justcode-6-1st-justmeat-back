const express = require('express');
const router = express.Router();

const salecontroller = require("../controllers/salecontroller");

router.post('/:userId', salecontroller.createSale);
router.get('/:userId', salecontroller.readSale)

module.exports = router;
