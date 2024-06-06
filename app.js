require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const axios = require("axios");

const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

const route = require("./src/routes/gatewayRoutes");
app.use(express.json());

app.use(async (req, res, next) => {
  if (
    req.path.startsWith("/video") ||
    req.path.startsWith("/comment") ||
    req.path.startsWith("/reply") 
    
  ) {
    try {
      const authorizationHeader = req.headers.authorization;
      const config = { headers: { Authorization: authorizationHeader } };
      const response = await axios.get(
        "http://localhost:3001/api/user/verify-token",
        config
      );
      req.user = response.data;
      next();
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  } else {
    next();
  }
});

app.use(route);

mongoose
  .connect(MONGODB_URI, {})
  .then(() => {;
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
