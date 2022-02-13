// External
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const path = require("path");
const cookieParser = require("cookie-parser");
const loginRouter= require("./router/loginRouter")
const inboxRouter= require("./router/inboxRouter")
const usersRouter= require("./router/usersRouter")
const app = express();
dotenv.config();
// process.env.APP_NME
// internal
const { notFoundHandler, errorHandler } = require("./middlewares/common/errorHandler");

// database configuration

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  console.log("Database connected successfully for Chat Application");
  client.close();
});
// mongoose
//   .connect(process.env.MONGO_CONNECTION_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() =>
//     console.log("Database connected successfully for Chat Application")
//   )
//   .then((err) => console.log(`Error ${err.message}`));
// req parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set view engine
app.set("view engine", "ejs");
// set static public
app.use(express.static(path.join(__dirname, "public")));
// set cookies
app.use(cookieParser(process.env.COOKIE_SECRET));
// routing set up routes
app.use("/",loginRouter);
app.use("/users",usersRouter);
app.use("/inbox",inboxRouter);
//error handler
app.use(notFoundHandler)
app.use(errorHandler)
app.listen(process.env.PORT, () => {
  console.log(`Application running on port ${process.env.PORT}`);
});
