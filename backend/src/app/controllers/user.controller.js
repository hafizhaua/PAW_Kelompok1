const db = require("../models/index");
const User = db.user;
const Role = db.role;

exports.readAll = async (req, res) => {
    try {
        User.find()
            .populate("roles", "-__v")
            .exec((err, users) => {
                users = users.map((user) => {
                    return {
                        id: user._id,
                        username: user.username,
                        roles: user.roles.map((r) => {
                            return r.name;
                        }),
                    };
                });
                res.status(200).send(users);
            });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const newRoles = {};
        if (req.body.roles) {
            const roles = await Role.find({
                name: { $in: req.body.roles },
            });
            newRoles.roles = roles.map((role) => role._id);
        }
        const result = await User.findByIdAndUpdate(req.params.id, newRoles);
        res.send(result);
    } catch (err) {}
};

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User.findByIdAndDelete(id);
        result
            ? res.send("Account has been deleted successfully.")
            : res.status(404).send({ message: "Account not found" });
    } catch (err) {
        res.status(409).send({
            message: err.message || "Error occured when deleting the data.",
        });
    }
};
