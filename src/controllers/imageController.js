var imageModel = require("../models/imageModel");

const fs = require("fs");
const path = require("path");
const response = require("../libs/responceLib");
// SET STORAGE
const multer = require("multer");
// const upload = multer({ dest: "images/" });
let imgUpload = async (req, res) => {
  try {
    var final_img = {
      name: req.file.filename,
      img: {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
      },
    };

    console.log("final_img", final_img);
    let api_res = await imageModel.create(final_img);

    console.log(api_res);
    let apiResponse = response.generate(false, "Success", api_res);
    res.status(200).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
  }
};
module.exports = { imgUpload: imgUpload };
