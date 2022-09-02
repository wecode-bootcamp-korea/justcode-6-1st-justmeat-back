const express = require('express');

const userRouter = require('./user');
const productrouter = require('./productrouter');
// const otherRouter = require('./other');

const router = express.Router();

router.use("/", userRouter);
router.use("/product", productrouter);
// router.use(otherRouter);

module.exports = router;
