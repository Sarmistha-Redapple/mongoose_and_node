const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let user = new Schema({
  user_id: { type: String, index: true, unique: true },
  username: { type: String },
  name: { type: String },
  password: { type: String },
  email: { type: String },
  mobile: { type: String },
  owner_id: { type: String },
  //   user_img: { type: String, default: "" },
});
const userSchema = mongoose.model("users", user);
// module.exports = mongoose.model("users", userSchema);
// module.exports = mongoose.model("User", userSchema);

let newCustomer = new Schema({
  name: { type: String },
  email: { type: String },
});
const newCustomer_ = mongoose.model("newCustomer", newCustomer);
// module.exports = mongoose.model("newCustomer", newCustomer);

let books = new Schema({
  title: { type: String },
  author: { type: String },
  copies: { type: String },
});
const books_1 = mongoose.model("books", books);
// module.exports = mongoose.model("books", books);

let booksProject = new Schema({
  title: { type: String },
  isbn: { type: String },
  author: { type: Object },
  copies: { type: Number },
  lastModified: { type: Date },
});
const books_2 = mongoose.model("books_", booksProject);
// module.exports = mongoose.model("books_", booksProject);
module.exports = {
  User: userSchema,
  newCustomer_: newCustomer_,
  books_1: books_1,
  books_2: books_2,
};
