const express = require('express');
const router = express.Router();

const userRouter = require("../routes/userRouter");
// const otherRouter = require('./other');

router.use('/user', userRouter);
// router.use(otherRouter);

module.exports = router;
