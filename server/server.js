const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require ('dotenv').config();

/* Routes */
const staffRoutes = require('./routes/staff.route');
// const statusRouter = require('./routes/status');
// const postRouter = require('./routes/post');

const PORT = process.env.PORT || 5000;


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/staff', staffRoutes);
// app.use('/status', statusRouter);
// app.use('/post', postRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
}
);
