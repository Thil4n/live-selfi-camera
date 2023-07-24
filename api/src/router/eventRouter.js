const express = require("express");
const eventController = require("../controllers/eventController");

const router = express.Router();

router.post("/", eventController.create);

router.get("/", eventController.get);

router.delete("/:id", eventController.drop);

router.patch("/", eventController.update);

module.exports = router;
