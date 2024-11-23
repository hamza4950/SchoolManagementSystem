const express = require("express");
const mongoose = require("mongoose");
const {engine} = require('express-handlebars');
const session = require("express-session");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo');
const path = require('path');

const User = require("./models/User.js");

const schoolRouter = require("./routes/schoolRouter.js");

//connect to mongodb
const dbURI = 'mongodb://localhost:27017/schoolManagement';
// Connect to the database and seed the database with some users
let theDatabaseConnection =null; // If needed we can access it through this variabel, need to check if not null of course
mongoose.connect(dbURI)
  .then( () => {
    console.log('Mongoose connected to ' + dbURI);
    theDatabaseConnection = mongoose.connection;
    theDatabaseConnection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });


    // Initialize database
    const users = User.find({});
    users.then( (userDocs) => {
        if(userDocs.length == 0) {
            /* REGISTER SOME USERS */
            User.register({username:'admin', active: false}, 'admin');
            User.register({username:'quest', active: false}, 'quest');
        }
    });
  });
  const db = mongoose.connection;

const app = express();
const publicDirectoryPath = path.join(__dirname, './public');
app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//session
app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: db.client.s.url })
  })
);
//passport
app.use(passport.initialize());
app.use(passport.session());
const strategy = new LocalStrategy(User.authenticate())
passport.use(strategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




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