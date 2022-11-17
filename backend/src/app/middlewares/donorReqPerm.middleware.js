const { donorRequest } = require("../models/index");

const canUpdateDelete = async (req, res, next) => {
    const requestId = parseInt(req.params.requestId);
    const donorReq = await donorRequest
        .findById(requestId)
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        });

    return donorReq.userId === req.userId;
};

const donorReqPerm = {
    canUpdateDelete,
};

module.exports = donorReqPerm;
