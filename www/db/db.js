const mongoose = require("mongoose");
const appConfig = require("../../config/appConfig");
const redis = require("redis");
const connection = mongoose.connection;

const startDB = (app) => {
  mongoose.connect(appConfig.db.uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
  });
  connection.on("open", function (err) {
    if (err) {
      console.log(`database error:${JSON.stringify(err)}`);
      process.exit(1);
    }
  });
  //   const redisClient = redis.createClient();
  //   redisClient.connect();
};
mongoose.set("debug", true);

module.exports = {
  startDB: startDB,
};
