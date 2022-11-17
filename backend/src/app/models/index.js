const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");
const donorRequest = require("./donorRequest.model");
const user = require("./user.model");
const role = require("./role.model");

mongoose.Promise = global.Promise;

const db = {
    mongoose: mongoose,
    url: dbConfig.url,
    donorRequest: donorRequest,
    user: user,
    role: role,
    ROLES: ["user", "admin", "moderator"],
};

module.exports = db;
