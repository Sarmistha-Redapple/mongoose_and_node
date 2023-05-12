const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let productSchema = new Schema({
  owner_id: { type: String, default: "" },
  auction_end_date: { type: String, default: "" },
  auction_start_date: { type: String, default: "" },
  auction_status: { type: String, default: "" },
  category_id: { type: String, default: "" },

  price: { type: String, default: "" },
  product_description: { type: String, default: "" },
  product_img: { type: String, default: "" },
  product_title: { type: String, default: "" },
  status: { type: String, default: "" },
  step: { type: String, default: "" },
});
module.exports = mongoose.model("Product", productSchema);
