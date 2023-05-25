const express = require("express");
const fs = require("fs");
const app = express();
const multer = require("multer");
const bodyParser = require("body-parser");
const database = require("./www/db/db");
const appConfig = require("./config/appConfig");
const routeLoggerMiddleware = require("./src/middlewares/routeLogger");
const globalErrorMiddleware = require("./src/middlewares/appErrorHandler");
const schemaPath = "./src/models";
const port = 4000;
//for models
fs.readdirSync(schemaPath).forEach((file) => {
  if (~file.indexOf(".js")) require(schemaPath + "/" + file);
});
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
// for body parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//error log
app.use(routeLoggerMiddleware.logIp);
app.use(globalErrorMiddleware.globalErrorHandler);
// header config
app.all(appConfig.allowedCorsOrigin, (req, res, next) => {
  res.header("Access-Control-Allow-Origin", appConfig.allowedCorsOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,token,key"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  next();
});
//for route
const routesPath = "./src/routes";
fs.readdirSync(routesPath).forEach((file) => {
  if (~file.indexOf(".js")) require(routesPath + "/" + file)(app); //for router connection
});
//
database.startDB(app);
app.listen(port, () => {
  console.log("Server is running on Port: " + port);
});
