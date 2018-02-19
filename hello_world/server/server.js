const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketServer = require("./sockets");
const movieRoutes = require("./routes/movie-routes");
const userRoutes = require("./routes/user-routes");
const authenticationChecker = require("./middleware/authenticaion");
const config = require("./config/config");

const dbAddress = config.externalDataBaseURL;
// const dbAddress = config.localDatabaseURL;

mongoose.connect(dbAddress, { useMongoClient: true });
const mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "mongodb connection error:"));
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");

app.use("/movies", authenticationChecker);

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

const port = process.env.PORT || 1234;
const server = app.listen(port, () => console.log(`Server is listening on port ${port}`));

socketServer.connect(server);

module.exports = app;
