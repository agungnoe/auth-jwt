const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const user = require("./routes/user");
const authConfig = require("./config/authConfig");

const app = express();

app.use(bodyParser({ extended: true }));

// Middlewares
app.use(
  session({
    name: "session-id",
    secret: "scret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      expires: 600000,
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());
authConfig(passport);

// Routes
app.use("/auth", auth);
app.use("/user", user);

//Run Server

app.listen(4000, () => console.log("Server Running in port 4000"));
