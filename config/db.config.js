const mysql = require("mysql");
require("dotenv").config();

let dbConn = null;
function handleDisconnect() {
  dbConn = mysql.createConnection({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bceb0bbaa4f9af',
    password: 'acd65c6b',
    database: 'heroku_ec7f6ec0f6cd80c',
  });
  mysql://bceb0bbaa4f9af:acd65c6b@us-cdbr-east-06.cleardb.net/heroku_ec7f6ec0f6cd80c?reconnect=true

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
