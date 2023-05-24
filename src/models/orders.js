const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let orders = new Schema({
  item: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: String,
  },
});

module.exports = mongoose.model("orders", orders);
