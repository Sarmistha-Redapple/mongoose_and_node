const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
let nftSchema = new Schema({
  address: { type: String, required: true },
  user_id: { type: String, required: true },
  balance: { type: String, required: true },
  // created_on: { type: String, default: "" },
});
module.exports = mongoose.model("Nft", nftSchema);
