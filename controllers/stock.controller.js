const StockModel = require("../models/stock.model");

// get all stock
exports.getStock = (req, res) => {
  StockModel.getStock((err, stock) => {
    if (err) {
      res.send(err);
    }
    console.log("getStock controller");
    res.send(stock);
  });
};

// get stock by id
exports.getStockById = (req, res) => {
  StockModel.getStockById(req.params.id, (err, stock) => {
    if (err) {
      res.send(err);
    }
    console.log("getStockById controller");
    res.send(stock);
  });
};

// create new stock
exports.createNewStock = (req, res) => {
  const stockReqData = new StockModel(req.body);
  console.log("createNewStock controller");
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    StockModel.createNewStock(stockReqData, (err, stock) => {
      if (err) {
        res.send(err);
      }
      res.json({
        status: true,
        message: "Stock Created Successfully",
        data: stock.insertId,
      });
    });
  }
};

// update stock
exports.updateStock = (req, res) => {
  const stockReqData = new StockModel(req.body);
  console.log("updateStock controller");
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    StockModel.updateStock(req.params.id, stockReqData, (err, stock) => {
      if (err) {
        res.send(err);
      }
      res.json({ status: true, message: "Stock updated Successfully" });
    });
  }
};

// delete stock
exports.deleteStock = (req, res) => {
  StockModel.deleteStock(req.params.id, (err, stock) => {
    if (err) {
      res.send(err);
    }
    res.json({ success: true, message: "Staff deleted successfully!" });
  });
};

// get stock by available
exports.getStockByAvailable = (req, res) => {
  Stock.Model.getStockByAvailable(req.params.available, (err, stock) => {
    if (err) {
      res.send(err);
    }
    console.log("getStockByAvailable controller");
    res.send(stock);
  });
};

// get stock by runningLow
exports.getStockByRunningLow = (req, res) => {
  Stock.Model.getStockByRunningLow(req.params.runningLow, (err, stock) => {
    if (err) {
      res.send(err);
    }
    console.log("getStockByRunningLow controller");
    res.send(stock);
  });
};

// get stock by outOfStock
exports.getStockByOutOfStock = (req, res) => {
  Stock.Model.getStockByOutOfStock(req.params.outOfStock, (err, stock) => {
    if (err) {
      res.send(err);
    }
    console.log("getStockByOutOfStock controller");
    res.send(stock);
  });
};
