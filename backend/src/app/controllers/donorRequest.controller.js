const db = require("../models/index");
const donorRequest = db.donorRequest;

exports.create = async (req, res) => {
    const donorRequestPost = new donorRequest({
        recipient: req.body.recipient,
        bloodType: req.body.bloodType,
        bagQuantity: req.body.bagQuantity,
        donorType: req.body.donorType,
        city: req.body.city,
        hospital: req.body.hospital,
        cpName: req.body.cpName,
        cpPhoneNum: req.body.cpPhoneNum,
        userId: req.userId,
    });

    try {
        const donorRequest = await donorRequestPost.save();
        res.send(donorRequest);
    } catch (err) {
        res.status(409).send({
            message: err.message || "Error occured when adding data.",
        });
    }
};

exports.readAll = async (req, res) => {
    try {
        const result = await donorRequest.find();
        const filters = req.query;

        let filteredResult = result.filter((donorReq) => {
            let isValid = true;
            for (key in filters) {
                if (donorReq[key]) {
                    isValid = isValid && donorReq[key] == filters[key];
                }
            }
            return isValid;
        });

        if (filters.sort == "newest") {
            filteredResult = filteredResult.sort(
                (reqA, reqB) => Number(reqB.date) - Number(reqA.date)
            );
        } else if (filters.sort == "oldest") {
            filteredResult = filteredResult.sort(
                (reqA, reqB) => Number(reqA.date) - Number(reqB.date)
            );
        }

        if (filters.name !== undefined) {
            filteredResult = filteredResult.filter((req) =>
                req.recipient.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        res.send(filteredResult);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error occured on retrieving the requests.",
        });
    }
};

exports.readOne = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await donorRequest.findById(id);
        res.send(result);
    } catch (err) {
        res.status(409).send({
            message:
                err.message || "Error occured when retrieving the request.",
        });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        req.body.date = Date.now();
        const result = await donorRequest.findByIdAndUpdate(id, req.body);
        result
            ? res.send("Data has been updated successfully.")
            : res.status(404).send({ message: "Data not found." });
    } catch (err) {
        res.status(409).send({
            message: err.message || "Error occured when updating data.",
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
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
