const AddressModel = require("../Models/AddressModel");

exports.createAddress = async (req, res) => {
  // res.send({ ...req.body, user: req.user });
  const { title, street, city, state, zip, country, latitude, longitude } =
    req.body;
  const user = req.user._id;

  try {
    const newAddress = await AddressModel.create({
      title,
      street,
      city,
      state,
      zip,
      country,
      user,
      coordinates: [longitude, latitude],
    });
    if (newAddress) {
      res.status(201).json({
        success: true,
        address: newAddress,
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAddress = async (req, res) => {
  const user = req.user._id;

  try {
    const addresses = await AddressModel.find({ user });
    if (addresses) {
      res.status(200).json({
        success: true,
        addresses: addresses,
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
