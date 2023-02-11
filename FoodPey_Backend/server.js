const app = require("./app");
const { connectDatabase } = require("./Config");

//Enviroment Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: __dirname + "/Config/Config.env" });
}

//Databse Connection
connectDatabase();

//Server Start
const server = app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on port:" + process.env.PORT);
});

//unhandled promis rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection.");
  server.close(() => {
    process.exit;
  });
});
