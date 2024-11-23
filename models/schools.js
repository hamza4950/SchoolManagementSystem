const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  eduLevel: {
    type: String,
    required: false,
  },
  studentNumber: {
    type: Number,
    min: 0,
    required: true,
  },
  headMaster: {
    type: String,
    default: "",
    required: false,
  },
});

const School = mongoose.model("School", schoolSchema);

module.exports = School;
