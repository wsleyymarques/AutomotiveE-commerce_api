const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = require("./app/routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => res.json({ message: "API funcionando" }));

module.exports = app;
