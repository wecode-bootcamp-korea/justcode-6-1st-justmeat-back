const express = require('express');
const router = express.Router();

const cartcontroller = require("../controllers/cartcontroller");

router.post('/', cartcontroller.createCart);
router.patch('/', cartcontroller.updateCart);
router.delete('/:pk', cartcontroller.deleteCart);

module.exports = router;
