const db = require("../models/index")
const donorRequest = db.donorRequests

exports.create = async(req, res) => {
    const donorRequestPost = new donorRequest({
        recipient: req.body.recipient,
        bloodType: req.body.bloodType,
        bagQuantity: req.body.bagQuantity,
        donorType: req.body.donorType,
        city: req.body.city,
        hospital: req.body.hospital,
        cpName: req.body.cpName,
        cpPhoneNum: req.body.cpPhoneNum,
    });

    try {
        const donorRequest = await donorRequestPost.save();
        res.send(donorRequest);
    } catch (err) {
        res.status(409).send({ message: err.message || "Error occured when adding data." });
    }
};

exports.readAll = async(req, res) => {
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

exports.readOne = async(req, res) => {
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

exports.update = async(req, res) => {}

exports.delete = async(req, res) => {
    try {
        const id = req.params.id
        const result = await donorRequest.findByIdAndRemove(id);
        result
            ?
            res.send("Data has been deleted successfully.") :
            res.status(404).send({ message: "Data not found" });
    } catch (err) {
        res.status(409).send({
            message: err.message || "Error occured when deleting the data.",
        });
    }
};