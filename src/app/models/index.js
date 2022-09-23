const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");
const donorRequests = require("./donorRequest.model");

mongoose.Promise = global.Promise;

const db = {
    mongoose: mongoose,
    url: dbConfig.url,
    donorRequests: donorRequests,
};

module.exports = db;
