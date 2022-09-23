const mongoose = require("mongoose");

const donorRequestSchema = mongoose.Schema({
    recipient: {
        type: String,
        required: true,
    },
    bloodType: {
        type: String,
        required: true,
    },
    bagQuantity: {
        type: Number,
        required: true,
    },
    donorType: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    hospital: {
        type: String,
        required: true,
    },
    cpName: {
        type: String,
        required: true,
    },
    cpPhoneNum: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("DonorRequest", donorRequestSchema);
