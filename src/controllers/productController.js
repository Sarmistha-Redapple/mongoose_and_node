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

module.exports = { ProductList: ProductList, ProductDetails: ProductDetails };
