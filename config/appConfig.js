let appConfig = {};
appConfig.allowedCorsOrigin = "*";
appConfig.sessionExpTime = 120 * 120;
appConfig.urlExpTime = 60;
appConfig.otpLinkExpTime = 3;
appConfig.db = {
  uri: "mongodb://localhost:27017/kennel",
  imgBucket: "photos",
};
module.exports = appConfig;
