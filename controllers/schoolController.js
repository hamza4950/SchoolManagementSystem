const School = require("../models/schools.js");
const passport = require("passport");
const User = require('../models/User.js');
class SchoolController {
    getMain = (req,res) => {
        res.render('main')
    }
    getSchools = async (req, res) => {
        try {
          const schools = await School.find({});
          const school = schools.map((school) => {
            return school.toObject();
          });
          res.render("schoolPage", { schools: school, });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }

      getAddSchools = (req, res) => {
        try {
          if (req.isAuthenticated()){
            res.render("schoolForm", {name:"", eduLevel:"", studentNumber:0, headMaster:""});
        }
        else {
          res.redirect("/")
        }
          
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }

      postAddSchools = async (req, res) => {
        try {
          const {name,eduLevel,studentNumber,headMaster,}  = req.body;
          await School.create({name: name, eduLevel: eduLevel, studentNumber: studentNumber, headMaster: headMaster})
          res.redirect("/schools");
        } catch (error) {
          console.error(error);
          res.redirect('back');
        }
      }

      getUpdateSchools = async (req, res) => {
        try {
          const id = req.query.id;
          const schools = await School.findById(id);
          const school =  schools.toObject();
          res.render("schoolForm", {name:school.name, eduLevel:school.eduLevel, studentNumber: school.studentNumber, headMaster:school.headMaster});
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }

      postUpdateSchools = async (req, res) => {
        try {
          const {name,eduLevel,studentNumber,headMaster,}  = req.body;
          const id = req.query.id;
          await School.findByIdAndUpdate(id, {name: name, eduLevel: eduLevel, studentNumber: studentNumber, headMaster: headMaster});
          res.redirect("/schools");
        } catch (error) {
          console.error(error);
          res.redirect('back');
        }
      }

      getDeleteSchools = async (req, res) => {
        try {
          const id = req.query.id;
          const schools = await School.findById(id);
          const school =  schools.toObject();
          res.render("schoolDeleteForm", {name:school.name, eduLevel:school.eduLevel, studentNumber: school.studentNumber, headMaster:school.headMaster});
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }

      postDeleteSchools = async (req, res) => {
        try {
          const id = req.query.id;
          await School.findByIdAndDelete(id)
          res.redirect("/schools");
        } catch (error) {
          console.error(error);
          res.redirect('back');
        }
      }

      getHelp = (req,res) => {
        res.render('help')
    }

      getLogin = (req,res) => {
        res.render('registerLogin', {mode: "Login"})
    }

    getRegister = (req,res) => {
      res.render('registerLogin', {mode: "Register"})
  }

  postRegister = (req,res, next) => {
    const username = req.body.username;
  const password = req.body.password;
 
  User.register(new User({username}), password, (error, user) => {
    if(error) {
      // Here it is ok to re-render, not to redirect because we do not need to change page!
      return res.render("registerLogin" );
    }

    // We could use the default handlers, here we see the full custom handling
    // if our application would like to do some special things
    const authenticator = passport.authenticate("local", (error,user,info) =>  {
      if (error) {
        // Something went bad authenticating user
        return next(error);
      }
    
      if (!user) {
        // Unauthorized, `info` contains the error messages if needed.
      // When we redirect we need to put the handlebars object on the app.locals
      // res.locals only remebers the current request cycle.
      // Here it is ok to re-render, not to redirect because we do not need to change page!
        res.render('registerLogin', {mode:'Register'} );
        return;
      }
    
      // save user in session: req.user
      req.login(user, (err) => {
        if (err) {
          // Session save went bad
          return next(err);
        }
        
        // Session save ok, we are now logged in and `req.user` is now set
        // In this example we have to set our own username also. Change to what you use.
        res.redirect('/');
      });
    });
    // ==>  Here we run the authenticator
    authenticator(req,res,next);
  });
  }

  




}

module.exports= SchoolController;