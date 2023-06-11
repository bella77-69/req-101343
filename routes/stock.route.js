const express = require("express");
const router = express.Router();

const stockController = require("../controllers/stock.controller");

// get all stock
router.get("/", stockController.getStock);

// get stock by ID
router.get("/:id", stockController.getStockById);

// get stock by available
router.get("/stock/:available", stockController.getStockByAvailable);

// get stock by runningLow
router.get("/stock/:runningLow", stockController.getStockByRunningLow);

// get stock by outOfStock
router.get("/stock/:outOfStock", stockController.getStockByOutOfStock);

// create new stock
router.post("/", stockController.createNewStock);

// update stock
router.put("/:id", stockController.updateStock);

// delete staff
router.delete("/:id", stockController.deleteStock);

module.exports = router;
