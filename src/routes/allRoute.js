const userController = require("../controllers/userController");
var router = require("express").Router();
const validator = require("../middlewares/validator");
module.exports = (app) => {
  router.post(
    `/register-user`,
    validator.customRegisterValidate,
    userController.userRegister
  );
  router.post(`/login`, validator.adminloginValidate, userController.userLogin);
  // router.get("/product-list", controler.getAllData);

  app.use("/", router);
};
