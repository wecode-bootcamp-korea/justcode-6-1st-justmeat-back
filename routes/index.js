const express = require('express');
const router = express.Router();

const userRouter = require("../routes/userRouter");
const productrouter = require('./productrouter');
// const otherRouter = require('./other');

router.use('/user', "/", userRouter);
router.use("/product", productrouter);
// router.use(otherRouter);

module.exports = router;
