const express = require("express")
const donorRequest = require("../controllers/donorRequest.controller")

const router = express.Router()

router.post("/", donorRequest.create)
router.get("/", donorRequest.readAll)
router.get("/:id", donorRequest.readOne)
// router.patch("/:id", donorRequest.update);
router.delete("/:id", donorRequest.delete)

module.exports = router
