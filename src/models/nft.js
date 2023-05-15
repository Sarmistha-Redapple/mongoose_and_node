const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
let nftSchema = new Schema({
  address: { type: String, default: "" },
  user_id: { type: String, default: "" },
  balance: { type: String, default: "" },
  created_on: { type: String, default: "" },
});
module.exports = mongoose.model("Nft", nftSchema);
