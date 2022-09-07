const express = require("express");
const eventcontroller = require("../controllers/eventcontroller");
const router = express.Router();

router.get("", eventcontroller.getEventList); //eventlist
router.post("/:id", eventcontroller.getEventDetail); //eventDetail



module.exports = router;