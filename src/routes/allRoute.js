const userController = require("../controllers/userController");
const ProductController = require("../controllers/productController");
var router = require("express").Router();
const validator = require("../middlewares/validator");
module.exports = (app) => {
  router.post(
    `/register-user`,
    validator.customRegisterValidate,
    userController.userRegister
  );
  router.post(`/login`, validator.adminloginValidate, userController.userLogin);
  router.get("/product-list", ProductController.ProductList);
  router.post("/get-product-details", ProductController.ProductDetails);
  router.post("/get-user-details", userController.UserDetails);
  router.post("/create-update-nftOwner", userController.createNft);
  router.post("/product-list-by-user", ProductController.ProductListByUser);
  router.post("/send-product-to-auction", ProductController.ProductAuction);
  // router.post("/add-bid", ProductController.addBid);
  //
  app.use("/", router);
};
