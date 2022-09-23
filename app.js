const express = require("express");
const mongoose = require("mongoose");
const db = require("./src/app/models/index");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const requestRoute = require("./src/app/routes/donorRequest.route");

app.get("/", (req, res) => {
    res.send("Donor request index page.");
});

app.use("/donorRequest", requestRoute);

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected successfully.");
    })
    .catch((err) => {
        console.log("Failed to connect to the database.", err);
        process.exit();
    });

app.listen(process.env.PORT, () => {
    console.log(`Server is successfully running on ${process.env.PORT}`);
});
