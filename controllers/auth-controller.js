const { response } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
// Home Method
const home = async (request, response) => {
  try {
    response.status(200).send("welcome to auth-controller this is home route");
  } catch (error) {
    response.status(400).send({
      message: "Oops...error coming from auth- controller home route",
    });
  }
};

// Register method
const register = async (request, response) => {
  try {
    const { username, email, phone, password } = request.body;

    const userExits = await User.findOne({ email });

    if (userExits) {
      return response.status(400).json({ message: "Email is already exits" });
    }

    const salt = 10;
    const Password = await bcrypt.hash(password, salt);
    const createUser = await User.create({
      username,
      email,
      phone,
      password: Password,
    });

    response.status(200).json({
      message: "Registration successfully completed",
      data: createUser,
      Token: await createUser.generateToken(),
      userID: createUser._id.toString(),
    });
  } catch (error) {
    response.status(400).send({
      message: "Oops...error coming from auth- controller register route",
      error: error,
    });
  }
};

// Login Method

const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    const emailFind = await User.findOne({ email });

    if (!emailFind) {
      response
        .status(400)
        .send({ success: false, message: "Oops....email not Exists" });
      // const errors = {
      //     status: 400,
      //     success: false,
      //     message: "Oops....email not Exists new backend"
      // };
      // next(errors);
    }

    const user = await emailFind.comparePassword(password, emailFind.password);
    if (user == false) {
      response
        .status(400)
        .send({ success: false, message: "Invalid Credentials......" });
    }
    response.status(200).json({
      message: "login successfully ",
      Token: await emailFind.generateToken(),
      userID: emailFind._id.toString(),
      isAdmin: emailFind.isAdmin,
    });
  } catch (error) {
    console.log(error);
  }
};

const user = async (request, response) => {
  try {
    const userData = await request.user;
    response.status(200).json({ success: true, userData: userData });
  } catch (error) {
    response
      .status(400)
      .send(`Oops..error coming form user route and error is : ${error}`);
  }
};

module.exports = { home, register, login, user };
