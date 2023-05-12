const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  user_id: { type: String, default: "", index: true, unique: true },
  username: { type: String, default: "" },
  name: { type: String, default: "" },
  password: { type: String, default: "" },
  email: { type: String, default: "" },
  mobile: { type: String, default: "" },
  owner_id: { type: String, default: "" },
  //   user_img: { type: String, default: "" },
});

module.exports = mongoose.model("User", userSchema);
