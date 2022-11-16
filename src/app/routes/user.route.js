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

router.get("/test/all", userController.allAccess);

router.get("/test/user", [authJwt.verifyToken], userController.userBoard);

router.get(
    "/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    userController.moderatorBoard
);

router.get(
    "/test/admin",
    authJwt.verifyToken,
    authJwt.isAdmin,
    userController.adminBoard
);

module.exports = router;
