const UserModel = require("../models/user");
const NftModel = require("../models/nft");
const response = require("../libs/responceLib");
const passwordLib = require("../libs/passwordLib");
const check = require("../libs/checkLib");
const tokenLib = require("../libs/tokenLib");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

let userRegister = async (req, res) => {
  try {
    const postData = req.body;
    console.log(postData);
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
    console.log(finduser);
    let newUser = new UserModel({
      user_id: uuidv4(),
      username: postData.username,
      name: postData.name,
      email: postData.email.toLowerCase(),
      mobile: postData.mobile,
      password: await passwordLib.hash(postData.password),
      // event_id: postData.event_id,
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
        owner_address: finduser.owner_id,
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
    console.log(postData);
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
      owner_address: api_res.owner_id,
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

    const filter = {
      user_id: postData.user_id,
    };
    const update = {
      address: postData.address,
      balance: postData.balance,
    };
    const usetUpdate = { owner_id: postData.address };
    // console.log(postData);
    let api_res = await NftModel.findOne(filter);
    // console.log("api_res" + api_res);

    if (check.isEmpty(api_res)) {
      let newNft = new NftModel({
        user_id: postData.user_id,
        balance: postData.balance,
        address: postData.address,
      });
      let payload = (await newNft.save()).toObject();
      delete payload.__v;
      let apiResponse = response.generate(false, "Created new Nft", payload);
      res.status(200).send(apiResponse);
    } else {
      let api_res = await NftModel.findOneAndUpdate(filter, update, {
        new: true,
      }).lean();
      let user_res = await UserModel.findOneAndUpdate(filter, usetUpdate, {
        new: true,
      }).lean();
      // console.log(api_res);
      // console.log("user_res", JSON.stringify(user_res));
      let apiResponse = response.generate(false, "Update Nft", api_res);
      res.status(200).send(apiResponse);
    }
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
