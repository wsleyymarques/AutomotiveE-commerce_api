const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = require("./app/routes");
const setupSwagger = require("./config/swagger");
const errorHandler = require("./app/middlewares/errorHandler");

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use(errorHandler)
setupSwagger(app);

app.get("/", (req, res) => res.json({ message: "API funcionando" }));

module.exports = app;

