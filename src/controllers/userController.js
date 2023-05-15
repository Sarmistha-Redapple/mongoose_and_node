const UserModel = require("../models/user");
const NftModel = require("../models/nft");
const response = require("../libs/responceLib");
const passwordLib = require("../libs/passwordLib");
const check = require("../libs/checkLib");
const tokenLib = require("../libs/tokenLib");
const { v4: uuidv4 } = require("uuid");

let userRegister = async (req, res) => {
  try {
    const postData = req.body;

    // console.log("req" + JSON.stringify(postData));
    let finduser = await UserModel.findOne({
      $and: [
        { event_id: postData.event_id },
        {
          $or: [
            { username: postData.username },
            { mobile: postData.mobile },
            { email: postData.email },
          ],
        },
      ],
    }).lean();
    let newUser = new UserModel({
      user_id: uuidv4(),
      username: postData.username,
      name: postData.name,
      email: postData.email.toLowerCase(),
      mobile: postData.mobile,
      password: await passwordLib.hash(postData.password),
      //   user_img: req.body.user_img,
    });
    if (check.isEmpty(finduser)) {
      let payload = (await newUser.save()).toObject();

      delete payload.__v;
      delete payload._id;
      delete payload.password;
      let apiResponse = response.generate(false, "Created new user", payload);
      res.status(200).send(apiResponse);
    } else {
      if (finduser.event_id == postData.event_id) {
        res.status(412);
        throw new Error("User Already Registered!");
      } else {
        let payload = (await newUser.save()).toObject();

        delete payload.__v;
        delete payload._id;
        delete payload.password;

        let apiResponse = response.generate(false, "Created new user", payload);
        res.status(200).send(apiResponse);
      }
    }
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
    console.log(apiResponse);
  }
};

let login = async (req, res) => {
  try {
    const postData = req.body;
    let finduser = await UserModel.findOne({
      $and: [{ event_id: postData.event_id }, { username: postData.username }],
    })
      // .select("-__v -_id")
      .lean();

    if (check.isEmpty(finduser)) {
      res.status(404);
      throw new Error("User not Registered!");
    }

    if (await passwordLib.verify(postData.password, finduser.password)) {
      // console.log("verified!", finduser);
      let payload = {
        user_id: finduser.user_id,
        username: finduser.username,
        name: finduser.name,
        email: finduser.email.toLowerCase(),
        mobile: finduser.mobile,
        token: await tokenLib.generateToken(finduser),
        owner_id: "",
        id: finduser._id,
      };
      console.log(payload);

      let apiResponse = response.generate(false, "logged in!", payload);
      res.status(200).send(apiResponse);
    } else {
      res.status(401);
      throw new Error("incorrect password!");
    }
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
    console.log(apiResponse);
  }
};
let UserDetails = async (req, res) => {
  try {
    const postData = req.body;
    // console.log(postData);
    let api_res = await UserModel.findOne({
      _id: postData.id,
    });
    let payload = {
      _id: api_res._id,
      user_id: api_res.user_id,
      username: api_res.username,
      name: api_res.name,
      email: api_res.email.toLowerCase(),
      mobile: api_res.mobile,
    };

    let apiResponse = response.generate(
      false,
      "User details successfully retrieved!",
      payload
    );
    res.status(200).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
    console.log(apiResponse);
  }
};
let createNft = async (req, res) => {
  try {
    const postData = req.body;
    const filter = { user_id: postData.user_id };
    // delete postData._id;
    const update = {
      address: postData.address,
      balance: postData.balance,
    };
    options = {
      // upsert: true,
      // new: true,
      // setDefaultsOnInsert: true,
      multi: false,
    };
    console.log(postData);
    await NftModel.findOneAndUpdate(filter, update, options).lean();
    let newNft = new NftModel({
      user_id: postData.user_id,
      balance: postData.balance,
      created_on: postData.created_on,
      address: postData.address,
    });

    let payload = (await newNft.save()).toObject();

    delete payload.__v;
    let apiResponse = response.generate(false, "Created new Nft", payload);
    res.status(200).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(400).send(apiResponse);
    console.log(apiResponse);
  }
};
module.exports = {
  userRegister: userRegister,
  userLogin: login,
  UserDetails: UserDetails,
  createNft: createNft,
};
