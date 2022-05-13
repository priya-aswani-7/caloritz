const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.log(`Error connecting to DB: ${error}`));

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => console.log(`Node.js API listening on port ${port}`));
