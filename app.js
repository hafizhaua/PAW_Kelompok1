const express = require("express")
const mongoose = require("mongoose")
const db = require("./src/app/models/index")
const cors = require("cors")

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

// Routes
const requestRoute = require("./src/app/routes/donorRequest.route")

app.get("/", (req, res) => {
  res.send("Donor request index page.")
})

app.use("/donorRequest", requestRoute)
app.get("*", (req, res) => {
  res.send("This root doesn't exist")
})

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully.")
  })
  .catch((err) => {
    console.log("Failed to connect to the database.", err)
    process.exit()
  })

app.listen(process.env.PORT, () => {
  console.log(`Server is successfully running on ${process.env.PORT}`)
})
