const express = require("express");
const app = express();

const jwt = require('jsonwebtoken');

// CORS package
const cors = require("cors");

// dotenv package
require("dotenv").config({ path: "./config.env" });


// set default port
const port = process.env.PORT || 5000;


// initialize app
app.use(cors());
app.use(express.json());

// set routes definition
app.use(require("./routes"));


// init db connection 
const mong = require("./db/init");


// initialize app entry
app.listen(port, () => {

    mong.init_db();
});