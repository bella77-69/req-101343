const mysql = require("mysql");
require("dotenv").config();

let dbConn = null;
function handleDisconnect() {
  dbConn = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b5cce34fc7a41a',
    password: '4307fec9',
    database: 'heroku_8670bcda6244736',
  })
  mysql:
  dbConn.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  dbConn.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();
setInterval(function () {
  dbConn.query("SELECT 1");
}, 5000);

module.exports = dbConn;
