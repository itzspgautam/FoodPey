const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../Utils/errorHandler");
const { verifyToken } = require("../Utils/jwtToken");
const UserModel = require("../Models/UserModel");

exports.isVendor = catchAsyncError(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new ErrorHandler("Invalid Token", 400));
  }
  let token = req.headers.authorization.split(" ")[1];

  verifyToken(token)
    .then(async (token) => {
      const vendor = await UserModel.findOne({
        _id: token.data,
        role: "vendor",
      });
      if (!vendor) {
        return next(
          new ErrorHandler(
            "You are not authorised to access this resource!",
            400
          )
        );
      }
      req.vendor = vendor;
      next();
    })
    .catch((error) => {
      console.log(error);
      return next(new ErrorHandler("Token expired! Please login again.", 401));
    });
});

exports.isUser = catchAsyncError(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new ErrorHandler("Invalid Token", 400));
  }
  let token = req.headers.authorization.split(" ")[1];

  verifyToken(token)
    .then(async (token) => {
      const user = await UserModel.findById(token.data);
      if (!user) {
        return next(
          new ErrorHandler(
            "You are not authorised to access this resource!",
            401
          )
        );
      }
      req.user = user;
      next();
    })
    .catch((error) => {
      console.log(error);
      return next(new ErrorHandler("Token expired! Please login again.", 401));
    });
});
