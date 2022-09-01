const express = require('express');
const router = express.Router();

const cartcontroller = require("../controllers/cartcontroller");

router.post('/', cartcontroller.createCart);
router.patch('/', cartcontroller.updateCart);
router.delete('/:pk', cartcontroller.deleteCart);
router.get('/:userId', cartcontroller.readCart);

module.exports = router;
