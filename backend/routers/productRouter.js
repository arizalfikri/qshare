const express = require("express");
const productRouter = express.Router();
const { Controller } = require("../controllers/index");
const { authentif } = require("../middleware/authentif");

productRouter.use(authentif);

productRouter.get("/", Controller.allProduct);
productRouter.post("/", Controller.createProduct);
productRouter.get("/order", Controller.readOrder);
productRouter.post("/order", Controller.createOrder);

module.exports = productRouter;
