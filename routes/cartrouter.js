const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const cartcontroller = require("../controllers/cartcontroller");

// 추가추가 여기다 더추가함
router.post('/:userId', checkAuth.isAuthenticated, cartcontroller.createOrUpdateCart);
router.get('/:userId', checkAuth.isAuthenticated, cartcontroller.readCart);
router.patch('/:userId', checkAuth.isAuthenticated, cartcontroller.updateCart);
router.delete('/:id', checkAuth.isAuthenticated, cartcontroller.deleteCart);

module.exports = router;
