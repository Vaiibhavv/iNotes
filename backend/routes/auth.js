const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
// const { findOne } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../fetchUserData/fetchuser");

process.env.JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
const JWT_SECRET  = process.env.JWT_SECRET;

router.post(
  "/createuser",
  [
    body("name", "enter valid name").isLength({ min: 3 }),
    body("email", "enter valid mail").isEmail(),
    body("password", "enter valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false; /// for login message
    const error = validationResult(req);
    /// check whether the login field is empty or not
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    // indexing and if user email is found already in database, the user will be refused
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "sorry the user with email is already exist" });
      }
      let salt = await bcrypt.genSalt(10);
      let secPswd = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPswd,
      });

      success=true;

      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({success,authToken });
    } catch (error) {
      res.status(500).send("Some error occured");
    }
  }
);
router.post(
  "/loginuser",
  [
    body("email", "enter valid mail").isEmail(),
    body("password", "password cannot matched").exists(),
  ],
  async (req, res) => {
    let success = false;
    const error = validationResult(req);
    /// check whether the login field is empty or not
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    // destructing the info from body
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter the correct email" });
      }
      success = true;

      let passwordComapare = await bcrypt.compare(password, user.password);

      if (!passwordComapare) {
        success = false;
        return res
          .status(400)
          .json({success, error: "Please enter the correct password" });
      }
      success = true;

      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_SECRET);
       let n= user.name;
       res.json({ success, authToken,n});
      
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// third route, to fetch the user information, with the help of middleware(fetuser()-func) (its used for authentication)
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
