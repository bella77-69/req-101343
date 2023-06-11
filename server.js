const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const staffRoutes = require('./routes/staff.route');
const stockRoutes = require("./routes/stock.route");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/staff", staffRoutes);
app.use("/stock", stockRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});