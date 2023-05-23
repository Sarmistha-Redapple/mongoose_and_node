const responseLib = require("../libs/responceLib");
const token = require("../libs/tokenLib");
const check = require("../libs/checkLib");
const appConfig = require("../../config/appConfig");

let isAuthorized = async (req, res, next) => {
  try {
    // console.log(req);
    if (req.header("token") && !check.isEmpty(req.header("token"))) {
      let decoded = await token.verifyClaimWithoutSecret(req.header("token"));
      //   console.log("decoded", decoded);
      req.user = decoded.data;
      next();
    } else {
      let apiResponse = responseLib.generate(
        true,
        "AuthorizationToken Is Missing In Request",
        null
      );
      res.status(403);
      res.send(apiResponse);
    }
  } catch (err) {
    let apiResponse = responseLib.generate(true, err.message, null);
    res.status(403);
    res.send(apiResponse);
  }
};
module.exports = {
  isAuthorized: isAuthorized,
};
