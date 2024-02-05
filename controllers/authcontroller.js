const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const allUser = await userModel.find({});

    if (allUser) {
      res.status(200).send({
        userCount: allUser.length,
        message: "All users",
        success: true,
        allUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while getting the user",
      success: false,
      error,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "email is Required" });
    }
    if (!password) {
      return res.send({ message: "password is Required" });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(400).send({ message: "Email is already exist" });
    }

    const hashedpass = await bcrypt.hash(password, 10);
    const user = await new userModel({
      username,
      email,
      password: hashedpass,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ message: "Fill the all fields" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",
      });
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }
    return res.status(200).send({
      success: true,
      messgae: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while login",
      success: false,
      error,
    });
  }
};

module.exports = { registerController, loginController, getAllUsers };
