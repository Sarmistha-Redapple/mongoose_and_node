const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let inventories = new Schema({
  sku: {
    type: String,
  },
  description: {
    type: Number,
  },
  instock: {
    type: String,
  },
});

module.exports = mongoose.model("inventory", inventories);
