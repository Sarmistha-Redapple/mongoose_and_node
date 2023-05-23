const jwt = require("jsonwebtoken");
const shortid = require("shortid");
require("dotenv").config();
const secretKey = process.env.ENC_KEY;
const config = require("../../config/appConfig");

let generateToken = (data) => {
  return new Promise((resolve, reject) => {
    try {
      let claims = {
        jwtid: shortid.generate(),
        iat: Date.now(),
        exp: Math.floor(Date.now() / 1000) + config.sessionExpTime,
        sub: "auth_token",
        data: data,
      };

      resolve(jwt.sign(claims, secretKey));
    } catch (err) {
      reject(err);
    }
  });
};
let verifyClaimWithoutSecret = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
module.exports = {
  generateToken: generateToken,
  verifyClaimWithoutSecret: verifyClaimWithoutSecret,
};
