const express = require("express");
const router = express.Router();
const { Controller } = require("../controllers/index");
const errorHandler = require("../middleware/errorHanlde");
const productRouter = require("./productRouter");

router.post("/login", Controller.login);
router.post("/register", Controller.register);

router.use("/product", productRouter);

router.use(errorHandler);

module.exports = router;
