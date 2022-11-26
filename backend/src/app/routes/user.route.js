const { Router } = require("express");
const { authJwt } = require("../middlewares");
const userController = require("../controllers/user.controller");

const router = Router();

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get(
    "/",
    authJwt.verifyToken,
    authJwt.isModerator,
    userController.readAll
);

router.patch(
    "/:id",
    authJwt.verifyToken,
    authJwt.isModerator,
    userController.updateRole
);

router.delete(
    "/:id",
    authJwt.verifyToken,
    authJwt.isModerator,
    userController.deleteAccount
);

module.exports = router;
