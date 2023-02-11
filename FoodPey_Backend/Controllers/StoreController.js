const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandler = require("../Utils/errorHandler");
const axios = require("axios");
const StoreModel = require("../Models/StoreModel");

//create store - store
exports.createStore = catchAsyncError(async (req, res, next) => {
  const { name, latitude, longitude, poster } = req.body;
  //res.send(req.vendor);

  if (!name || !latitude || !longitude) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  try {
    const createStore = await StoreModel.create({
      name,
      vendor: req.vendor._id,
      coordinates: [longitude, latitude],
      poster,
    });
    res.status(201).json({
      success: true,
      store: createStore,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//Get Nearby Address -user
exports.getNearbyStores = catchAsyncError(async (req, res, next) => {
  const { latitude, longitude, maxDistanceinKm } = req.query;

  if (!latitude || !longitude || !maxDistanceinKm) {
    return next(
      new ErrorHandler(
        "Latitude, Longitude and maximum distance is required.",
        400
      )
    );
  }

  try {
    const stores = await StoreModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: "distance",
          maxDistance: maxDistanceinKm * 1000,
          spherical: true,
        },
      },
    ]);
    console.log("Stores neaarby", stores);
    res.status(201).json({
      success: true,
      store: stores,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});
