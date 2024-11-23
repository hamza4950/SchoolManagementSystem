const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

// Define the schema
const userSchema = mongoose.Schema(

    {
        username: {
            type: String,
            required: true,
            unique: true
        }
    }  
);

// this connects passport to our user model
userSchema.plugin(passportLocalMongoose);

// Define the schema class
const User = mongoose.model("User", userSchema);

// we export the constructor
module.exports = User;