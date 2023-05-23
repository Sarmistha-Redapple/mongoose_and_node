const Joi = require("joi").extend(require("@joi/date"));
const responseLib = require("../libs/responceLib");

const customRegisterValidateSchema = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().max(20).required(),
  email: Joi.string()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
  mobile: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});
const customAdminLoginValidateSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().max(20).required(),
});
let customRegisterValidate = async (req, res, next) => {
  try {
    const value = await customRegisterValidateSchema.validate(req.body);
    console.log(JSON.stringify(value));
    if (value.hasOwnProperty("error")) {
      throw new Error(value.error);
    } else {
      next();
    }
  } catch (err) {
    let apiResponse = responseLib.generate(true, ` ${err.message}`, null);
    res.status(400);
    res.send(apiResponse);
  }
};

let adminloginValidate = async (req, res, next) => {
  try {
    const value = await customAdminLoginValidateSchema.validate(req.body);
    if (value.hasOwnProperty("error")) {
      throw new Error(value.error);
    } else {
      next();
    }
  } catch (err) {
    let apiResponse = responseLib.generate(true, ` ${err.message}`, null);
    res.status(400);
    res.send(apiResponse);
  }
};
module.exports = {
  customRegisterValidate: customRegisterValidate,
  adminloginValidate: adminloginValidate,
};
