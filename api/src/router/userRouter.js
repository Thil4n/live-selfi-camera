const express = require("express");
const userController = require("../controllers/userController");
const verify = require("../middleware/auth");

const router = express.Router();

router.post("/login", userController.login);

router.post("/", userController.create);
router.post("/register", userController.register);

router.get("/", userController.get);

router.delete("/:id", userController.drop);

router.patch("/", userController.update);

//router.get("/authenticate", verify, userController.authenticate);

module.exports = router;
