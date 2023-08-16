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

let newCustomer = new Schema({
  name: { type: String },
  email: { type: String },
});
const newCustomer_ = mongoose.model("newCustomer", newCustomer);

let books = new Schema({
  title: { type: String },
  author: { type: String },
  copies: { type: String },
});
const books_1 = mongoose.model("books", books);

let booksProject = new Schema({
  title: { type: String },
  isbn: { type: String },
  author: { type: Object },
  copies: { type: Number },
  lastModified: { type: Date },
});
const books_2 = mongoose.model("books_", booksProject);

let customer = new Schema(
  {
    CustomerName: { type: String },
    ContactName: { type: String },
    Address: { type: String },
    City: { type: String },
    PostalCode: { type: String },
    Country: { type: String },
  },
  { collection: "Customers" }
);
const customerTable = mongoose.model("Customers", customer);

module.exports = {
  User: userSchema,
  newCustomer_: newCustomer_,
  books_1: books_1,
  books_2: books_2,
  customerTable: customerTable,
};
