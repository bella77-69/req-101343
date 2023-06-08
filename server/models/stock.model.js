const dbConn = require("../config/db.config");

const Stock = function (stock) {
    this.color = stock.color;
    this.stock = stock.stock;
    this.available = stock.available;
    this.runningLow = stock.runningLow;
    this.outOfStock = stock.outOfStock;
    }

Stock.getStock = (result) => {
    dbConn.query("Select * from inventory", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log("staff : ", res);
                result(null, res);
            }
    });
}

Stock.getStockById = (id, result) => {
    dbConn.query("Select * from inventory where id = ? ", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Stock.createNewStock = (stockReqData, result) => {
    dbConn.query(
        "INSERT INTO inventory SET ?",
        stockReqData,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log('Stock created successfully');
                result(null, res)
            }
        }
    )
}

    

Stock.getStockByAvailable = (available, result) => {
        dbConn.query("Select * from inventory where available = ? ", available, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
}

Stock.getStockByRunningLow = (runningLow, result) => {
    dbConn.query("Select * from inventory where runningLow = ? ", runningLow, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Stock.getStockByOutOfStock = (outOfStock, result) => {
    dbConn.query("Select * from inventory where outOfStock = ? ", outOfStock, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Stock.updateStock = (id, stock, result) => {
        dbConn.query(
            "UPDATE inventory SET color=?,stock=?,available=?, runningLow=?, outOfStock=?  WHERE id = ?",
            [stock.color, stock.stock, stock.available, stock.runningLow, stock.outOfStock, id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                } else {
                    result(null, res);
                }
            }
        );
}

Stock.deleteStock = (id, result) => {
        dbConn.query("DELETE FROM inventory WHERE id = ?", [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
}

module.exports = Stock;