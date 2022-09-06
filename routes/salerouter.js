const express = require('express');
const router = express.Router();

const salecontroller = require("../controllers/salecontroller");

router.post('/:userId', salecontroller.createSale);
router.get('/:userId', salecontroller.readSale)
// router.patch('/userId', salecontroller.updateProduct)
router.get('/', salecontroller.pointCheck)

module.exports = router;
