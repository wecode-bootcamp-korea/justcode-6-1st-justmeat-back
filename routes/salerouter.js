const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const salecontroller = require("../controllers/salecontroller");

router.post('/:userId', checkAuth.isAuthenticated, salecontroller.createSale);
router.get('/:userId', checkAuth.isAuthenticated, salecontroller.readSale)

module.exports = router;
