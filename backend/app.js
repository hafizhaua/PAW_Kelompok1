const express = require("express");
const mongoose = require("mongoose");
const db = require("./src/app/models/index");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

const corsOptions = {
    origin: "https://bloodio.vercel.app/",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes
const requestRoute = require("./src/app/routes/donorRequest.route");
const authRoute = require("./src/app/routes/auth.route");
const userRoute = require("./src/app/routes/user.route");

app.get("/", (req, res) => {
    res.send("Bloodio API index page.");
});

app.use("/api/donorRequest", requestRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.get("*", (req, res) => {
    res.send("This root doesn't exist");
});

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected successfully.");
        initial();
    })
    .catch((err) => {
        console.log("Failed to connect to the database.", err);
        process.exit();
    });

app.listen(process.env.PORT, () => {
    console.log(`Server is successfully running on ${process.env.PORT}`);
});

const Role = db.role;

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user",
            }).save((err) => {
                err
                    ? console.log("Error occured: ", err)
                    : console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator",
            }).save((err) => {
                err
                    ? console.log("Error occured: ", err)
                    : console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin",
            }).save((err) => {
                err
                    ? console.log("Error occured: ", err)
                    : console.log("added 'admin' to roles collection");
            });
        }
    });
}
