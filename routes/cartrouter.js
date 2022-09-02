const express = require('express');
const router = express.Router();

const cartcontroller = require("../controllers/cartcontroller");

router.post('/', cartcontroller.createCart);
router.patch('/', cartcontroller.updateCart);
router.delete('/:pk', cartcontroller.deleteCart);
router.get('/:userId', cartcontroller.readCart);

// 추가추가
router.post("createOrUpdate", cartcontroller.createOrUpdateCart);

module.exports = router;
