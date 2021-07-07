const { User } = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userSignUp = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;
    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists, Please Login"
      });
    }
    try {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          res.status(500).json({ success: false, error: err });
        } else {
          const userCreds = new User({
            firstName,
            email,
            password: hash
          });
          await userCreds.save();
          res.status(201).json({
            success: true,
            message: "Acount Created Successfully"
          });
        }
      });
    } catch (err) {
      console.log("killa error", err);
      res.status(400).json({ success: false, message: "something went wrong" });
    }
  } catch (error) {
    res.json({ success: false, message: "some error occured" });
  }
};
