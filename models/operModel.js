const mongoose = require("mongoose");

// Identify data Schema for Operations
const operSchema = new mongoose.Schema({
    Requirement: {
        type: String,
        require: [true, "Operation must have a Requirement"]},
    Team: {
        type: String,
        require: [true, "Operation must have Team name"]},
    Team_ID: {
        type: String,
        default: "NA",
        require: [true, "Operation must have Team ID"]},
    OPN: {
        type: String,
        require: [true, "Operation must have OBJ/OPN"]},
    Capability: {
        type: String,
        require: [true, "Operation must have a Capability"]},
    Progress: {
        type: Number,
        default: 1,
        require: [true, "Operation must have Progress"]},
    Status: {
        type: String,
        require: [true, "Operation must have a Capability"]},
    Completed: Date,
    Document:  String,
    Bullet1: String,
    Bullet2: String,
    Bullet3: String,
    Bullet4: String,
    Bullet5: String,
});

// This command generates a "posts" collection in the MongoDB, if one doesn't already exist
const Post = mongoose.model("Post", operSchema);
module.exports = Post;