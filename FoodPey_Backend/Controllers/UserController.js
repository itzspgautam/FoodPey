const catchAsyncError = require("../Middleware/catchAsyncError");
const UserModel = require("../Models/UserModel");
const ErrorHandler = require("../Utils/errorHandler");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../Utils/jwtToken");

exports.register = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const isAlreadyRegistered = await UserModel.findOne({ email });
    if (isAlreadyRegistered) {
      return next(new ErrorHandler("Email is already registered.", 400));
    }
    const register = await UserModel.create({
      name,
      email,
      password,
    });

    const token = await generateToken(register._id);
    res.status(201).json({
      success: true,
      token,
      user: {
        name: register.name,
        email: register.email,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  try {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email.", 400));
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return next(new ErrorHandler("Invalid Password.", 401));
    }

    const token = await generateToken(user._id);
    const userSafe = await UserModel.findById(user._id);
    console.log(token);
    res.status(201).json({
      success: true,
      token,
      user: userSafe,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
});

exports.tokenVerification = catchAsyncError(async (req, res, next) => {
  let tokenToVerify = req.headers.authorization.split(" ")[1];
  console.log(tokenToVerify);
  if (!req.headers.authorization) {
    return next(new ErrorHandler("Invalid Token", 400));
  }

  verifyToken(tokenToVerify)
    .then(async (token) => {
      const user = await UserModel.findById(token.data);
      if (!user) {
        return next(new ErrorHandler("USer not found!", 400));
      }
      res
        .status(200)
        .json({ success: true, token: req.headers.authorization, user });
    })
    .catch((error) => {
      console.log(error);
      return next(new ErrorHandler("Token expired! Please login again.", 401));
    });
});
