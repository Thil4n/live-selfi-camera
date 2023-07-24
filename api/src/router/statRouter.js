const express = require("express");
const statController = require("../controllers/statController");

const router = express.Router();

router.get("/", statController.getCounts);

module.exports = router;
