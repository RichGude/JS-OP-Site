const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "User must have a username"],
        unique: true},
    password: {
        type: String,
        require: [true, "User must have a password"]},
});

// This command generates a "users" collection in the MongoDB, if one doesn't already exist
const User = mongoose.model("User", userSchema);

module.exports = User;