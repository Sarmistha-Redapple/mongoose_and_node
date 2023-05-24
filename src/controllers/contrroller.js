const employees = require("../models/model");
const response = require("../libs/responceLib");
const inventory = require("../models/inventory");
const orders = require("../models/orders");
let addUser = async (req, res) => {
  try {
    const postData = req.body;

    let api_res = await employees.insertMany(postData);
    let apiResponse = response.generate(false, "Created new user!", api_res);
    res.status(200).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
  }
};
let getAllData = async (req, res) => {
  try {
    let api_res = await employees.find();
    let apiResponse = response.generate(
      false,
      "Successfully fetch from DB",
      api_res
    );
    res.status(200).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
  }
};
let getByIdData = async (req, res) => {
  try {
    const postData = req.body;
    // await employees.findOne(postData).then((result) => {
    //   console.log(result);
    //   res.send(result);
    //   console.log("Successfully fetch by id from DB");
    // });
    let api_res = await employees.findOne(postData);
    let apiResponse = response.generate(
      false,
      "Successfully fetch by id  from DB",
      api_res
    );
    res.status(200).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
    // res.send(err);
  }
};
let getUpdatedData = async (req, res) => {
  try {
    const postData = req.body;
    // console.log(postData);
    let api_res = await employees.updateOne(
      { _id: postData._id },
      { name: postData.name }
    );
    let apiResponse = response.generate(
      false,
      "Successfully Updated ",
      api_res
    );
    res.status(200).send(apiResponse);
    // await employees.updateOne({ _id: postData._id }, { name: postData.name })
    //   .then((result) => {
    //     console.log(result);
    //     res.send(result);
    //     console.log("Successfully fetch by id from DB");
    //   });
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
    // res.send(err);
  }
};
let deletedItem = async (req, res) => {
  try {
    const postData = req.body;
    let api_res = await employees.deleteOne(postData);
    let apiResponse = response.generate(
      false,
      "Successfully delete by id from DB",
      api_res
    );
    res.status(200).send(apiResponse);
    // console.log(postData);
    // await employees.deleteOne(postData).then((result) => {
    //   console.log(result);
    //   res.send(result);
    //   console.log("Successfully delete by id from DB");
    // });
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
    // res.send(err);
  }
};
let lookupTest = async (req, res) => {
  try {
    // let api_res = await orders.aggregate([
    //   {
    //     $lookup: {
    //       from: "inventories",
    //       localField: "item",
    //       foreignField: "sku",
    //       as: "inventory_docs",
    //     },
    //   },
    // ]);
    let api_res = await inventory.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "sku",
          foreignField: "item",
          as: "inventory_docs",
        },
      },
    ]);
    // console.log(api_res);
    let apiResponse = response.generate(false, "Success", api_res);
    res.status(200).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
  }
};
module.exports = {
  addUser: addUser,
  getAllData: getAllData,
  getByIdData: getByIdData,
  getUpdatedData: getUpdatedData,
  deletedItem: deletedItem,
  lookupTest: lookupTest,
};
