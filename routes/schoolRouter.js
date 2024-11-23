const passport = require("passport");
const express = require("express");
const schoolRouter = express.Router();
const schoolController = require("../controllers/schoolController");

const theSchoolController = new schoolController();

// Define routes
schoolRouter.get("/", theSchoolController.getMain);
schoolRouter.get("/schools", theSchoolController.getSchools);
schoolRouter.get("/add", theSchoolController.getAddSchools);
schoolRouter.get("/schools/update", theSchoolController.getUpdateSchools);
schoolRouter.get("/schools/delete", theSchoolController.getDeleteSchools);
schoolRouter.get("/help", theSchoolController.getHelp);
schoolRouter.get("/login", theSchoolController.getLogin);
schoolRouter.get("/register", theSchoolController.getRegister);

schoolRouter.post("/add", theSchoolController.postAddSchools)
schoolRouter.post("/schools/delete", theSchoolController.postDeleteSchools)
schoolRouter.post("/schools/update", theSchoolController.postUpdateSchools)
schoolRouter.post("/register", theSchoolController.postRegister)
schoolRouter.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/'}), function (err, req, res, next) {
    if (err) next(err);
});
module.exports = schoolRouter;
