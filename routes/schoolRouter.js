// routes/thingRoutes.js
const express = require("express");
const schoolRouter = express.Router();
const schoolController = require("../controllers/schoolController");

const theSchoolController = new schoolController();

// Define routes
schoolRouter.get("/", theSchoolController.getMain);

module.exports = schoolRouter;
