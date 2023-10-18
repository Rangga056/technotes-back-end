const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ username }).exec();

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const accessToken = jwt.sign(
    {
      "UserInfo": {
        "username": foundUser.username,
        "rolse": foundUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10s" }
  );

  const refreshToken = jwt.sign(
    { "username": foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // Create secure cookie with refresh token 
});

// @desc Refresh
// @route POST /auth/refresh
// @access Public - because access token has expired
const refresh = async (req, res) => {
  // code
};

// @desc Login
// @route POST /auth/logout
// @access Public - just to clear cookies if exist
const logout = asyncHandler(async (req, res) => {
  // code
});

module.exports = {
  login,
  refresh,
  logout,
};
