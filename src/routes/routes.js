const controler = require("../controllers/contrroller");
var router = require("express").Router();
module.exports = (app) => {
  router.post("/insertdata", controler.addUser);
  router.get("/fetchdata", controler.getAllData);
  router.get("/fetch_By_id", controler.getByIdData);
  router.post("/update_by_id", controler.getUpdatedData);
  router.post("/delete_by_id", controler.deletedItem);
  router.get("/lookup", controler.lookupTest);
  app.use("/", router);
};
