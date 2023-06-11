const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const staffRoutes = require('./routes/staff.route');
const stockRoutes = require("./routes/stock.route");

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/staff", staffRoutes);
app.use("/stock", stockRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});