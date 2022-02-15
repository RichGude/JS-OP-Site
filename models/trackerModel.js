const mongoose = require("mongoose");

// Identify data Schema for Operations
const trackerSchema = new mongoose.Schema({
    Survey_Wifi: Number,
    Survey_Cell: Number,
    PGL_DF: Number,
    Pivot: Number,
    Implant: Number,
    TTL: Number,
    Audio: Number,
    Video: Number,
    Fabrication: Number,
    Data_Exfil: Number,
    Concealment: Number,
    Drones_Flown: Number,
    Drone_Lethal_Finish: Number,
    UGV_Lethal_Finish: Number,
    TECHEX: Number,
    F_and_S: Number,
    Entries: Number,
    SSE: Number,
    CELLEX: Number,
    Source_Training: Number,
    V_Characterization: Number,
});

// This command generates a "trackers" collection in the MongoDB, if one doesn't already exist
const Tracker = mongoose.model("Tracker", trackerSchema);
module.exports = Tracker;