const express = require("express");
const router = express.Router();
const { Controller } = require("../controllers/index");
const errorHandler = require("../middleware/errorHanlde");
const { authentif } = require("../middleware/authentif");

router.post("/login", Controller.login);
router.post("/register", Controller.register);

// router.use(authentif);

// router.get("/orders", Controller);
// router.post("/orders", Controller);

router.use(errorHandler);

module.exports = router;
