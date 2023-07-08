const express = require("express");
const router = express.Router();
const { Controller } = require("../controllers/index");

router.get("/orders", Controller);
router.post("/orders", Controller);

router.use(errorHandler);

module.exports = router;
