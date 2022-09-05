const express = require('express');
const router = express.Router();
//const checkAuth = require("../middleware/checkAuth");

const cartcontroller = require("../controllers/cartcontroller");

//router.post('/', cartcontroller.createCart);
//router.patch('/', cartcontroller.updateCart);
router.delete('/:pk', cartcontroller.deleteCart);
router.get('/:userId', cartcontroller.readCart);

// 추가추가 여기다 더추가함
// router.post('/', checkAuth.isAuthenticated, cartcontroller.createOrUpdateCart);
router.post('/', cartcontroller.createOrUpdateCart);
router.patch('/', cartcontroller.updateCart);

module.exports = router;
