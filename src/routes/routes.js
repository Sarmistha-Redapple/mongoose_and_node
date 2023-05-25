const controler = require("../controllers/contrroller");
const imgCont = require("../controllers/imageController");
var router = require("express").Router();
const upload = require("../middlewares/upload");

module.exports = (app) => {
  router.post("/insertdata", controler.addUser);
  router.get("/fetchdata", controler.getAllData);
  router.get("/fetch_By_id", controler.getByIdData);
  router.post("/update_by_id", controler.getUpdatedData);
  router.post("/delete_by_id", controler.deletedItem);
  router.get("/lookup", controler.lookupTest); //
  router.post("/addCustomer", controler.addmorecustomer);
  router.get("/outapi", controler.tableOut);
  router.post("/uploadphoto", upload.single("file"), imgCont.imgUpload);
  router.get("/projectdbex", controler.projectDBEx);
  app.use("/", router);
};
