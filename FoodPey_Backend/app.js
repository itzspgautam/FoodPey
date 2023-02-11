const express = require("express");
const errorMiddleware = require("./Middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

//Routes import
const userRouter = require("./Routes/UserRoutes");
const StoreRoutes = require("./Routes/StoreRoutes");
const AddressRoutes = require("./Routes/AddressRoutes");

app.use("/api/v1", userRouter);
app.use("/api/v1", StoreRoutes);
app.use("/api/v1", AddressRoutes);

//Middlewre for error
app.use(errorMiddleware);

module.exports = app;
