require("dotenv/config");

const dbConfig = {
    url: process.env.DB_URL,
};

module.exports = dbConfig;
