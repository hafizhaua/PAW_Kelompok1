const db = require("../models/index")
const donorRequest = db.donorRequests

exports.create = async (req, res) => {}

exports.readAll = async (req, res) => {
  try {
    const result = await donorRequest.find()
    const filters = req.query

    const filteredResult = result.filter((donorReq) => {
      let isValid = true
      for (key in filters) {
        isValid = isValid && donorReq[key] == filters[key]
      }
      return isValid
    })

    res.send(filteredResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occured on retrieving the requests.",
    })
  }
}

exports.readOne = async (req, res) => {
  try {
    const id = req.params.id
    const result = await donorRequest.findById(id)
    res.send(result)
  } catch (err) {
    res.status(409).send({
      message: err.message || "Error occured when retrieving the request.",
    })
  }
}

exports.update = async (req, res) => {}

exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    const result = await donorRequest.findByIdAndRemove(id);
    result
      ? res.send("Data has been deleted successfully.")
      : res.status(404).send({ message: "Data not found" });
  } catch (err) {
      res.status(409).send({
        message: err.message || "Error occured when deleting the data.",
    });
  }
};
