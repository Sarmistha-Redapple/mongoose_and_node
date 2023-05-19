const ProductModal = require("../models/product");
const response = require("../libs/responceLib");
const check = require("../libs/checkLib");
let ProductList = async (req, res) => {
  try {
    // console.log(req);
    let api_res = await ProductModal.find();
    let apiResponse = response.generate(
      false,
      "Product list successfully retrieved!",
      api_res
    );
    res.status(200).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
    console.log(apiResponse);
  }
};

let ProductDetails = async (req, res) => {
  try {
    const postData = req.body;
    let api_res = await ProductModal.findOne({
      _id: postData.product_id,
    });
    let payload = [
      {
        _id: api_res._id,
        owner_id: api_res.owner_id,
        auction_start_date: api_res.auction_start_date,
        auction_end_date: api_res.auction_end_date,
        auction_status: api_res.auction_status,
        category_id: api_res.category_id,
        price: api_res.price,
        product_description: api_res.product_description,
        product_title: api_res.product_title,
        product_img: api_res.product_img,
        category_name: api_res.category_name,
        step: api_res.step,
        status: api_res.status,
        user_id: api_res.user_id,
      },
    ];
    let apiResponse = response.generate(
      false,
      "Product details successfully retrieved!",
      payload
    );
    res.status(200).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
    console.log(apiResponse);
  }
};
let ProductListByUser = async (req, res) => {
  try {
    const postData = req.body;
    let api_res = await ProductModal.findOne({
      owner_id: postData.owner_id,
    });
    let payload = [
      {
        _id: api_res._id,
        owner_id: api_res.owner_id,
        auction_start_date: api_res.auction_start_date,
        auction_end_date: api_res.auction_end_date,
        auction_status: api_res.auction_status,
        category_id: api_res.category_id,
        price: api_res.price,
        product_description: api_res.product_description,
        product_title: api_res.product_title,
        product_img: api_res.product_img,
        category_name: api_res.category_name,
        step: api_res.step,
        status: api_res.status,
        bidList: api_res.bidList,
      },
    ];
    let apiResponse = response.generate(
      false,
      "Product details successfully retrieved!",
      payload
    );
    res.status(200).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
    console.log(apiResponse);
  }
};
let ProductAuction = async (req, res) => {
  try {
    const postData = req.body;
    const filter = { _id: postData.product_id };
    const update = {
      auction_start_date: postData.auction_start_date,
      auction_end_date: postData.auction_end_date,
      step: postData.step,
      auction_status: "started",
    };

    let api_res1 = await ProductModal.findOneAndUpdate(filter, update).lean();
    console.log(api_res1);
    let apiResponse = response.generate(
      false,
      "Update Product details successfully retrieved!",
      update
    );
    res.status(200).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
    console.log(apiResponse);
  }
};
let addBid = async (req, res) => {
  try {
    const postData = req.body;
    const filter = {
      _id: postData.product_id,
    };
    const update = {
      price: postData.price,
      owner_id: postData.owner_id,
      user_id: postData.user_id,
    };
    let findProduct = await ProductModal.findOneAndUpdate(filter, {
      $push: { bidList: update },
    }).lean();
    console.log(findProduct);
    let apiResponse = response.generate(false, "find data", findProduct);
    res.status(200).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
    console.log(apiResponse);
  }
};
let bidListByProduct = async (req, res) => {
  try {
    const postData = req.body;
    const filter = {
      _id: postData.product_id,
    };
    let api_res = await ProductModal.findOne(filter);
    let apiResponse = response.generate(false, "All bid list", api_res.bidList);
    res.status(200).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
    console.log(apiResponse);
  }
};
module.exports = {
  ProductList: ProductList,
  ProductDetails: ProductDetails,
  ProductListByUser: ProductListByUser,
  ProductAuction: ProductAuction,
  addBid: addBid,
  bidListByProduct: bidListByProduct,
};
