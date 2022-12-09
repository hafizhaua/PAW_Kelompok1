const db = require("../models/index");
const { donorRequest } = require("../models/index");
const Role = db.role;
const User = db.user;

const canUpdateDelete = async (req, res, next) => {
    const requestId = req.params.id;
    const donorReq = await donorRequest.findById(requestId);

    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (
                        roles[i].name === "admin" ||
                        donorReq.userId === req.userId
                    ) {
                        next();
                        return;
                    }
                }

                res.status(401).send({
                    message: "Unauthorized!",
                });
                return;
            }
        );
    });
};

const donorReqPerm = {
    canUpdateDelete,
};

module.exports = donorReqPerm;
