const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const {engine} = require('express-handlebars');
const session = require("express-session");

//const config = require("./config");
const schoolRouter = require("./routes/schoolRouter.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Set up handlebars as the view engine
app.engine( "hbs",  engine({
    extname: ".hbs",
    defaultLayout: "default",
    layoutsDir: __dirname + "/views/layouts",
      })
    );
    app.set("view engine", "hbs");
    app.set("views", __dirname + "/views");
    
    // Routes
    app.use("/", schoolRouter);
    
    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });