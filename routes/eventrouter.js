const express = require("express");
const eventcontroller = require("../controllers/eventcontroller");
const router = express.Router();

router.get("", eventcontroller.getEventList); //event
router.post("", eventcontroller.getEventDetail); //eventDetail


module.exports = router;