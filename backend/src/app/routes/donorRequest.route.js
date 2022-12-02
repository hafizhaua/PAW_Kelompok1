const { Router } = require("express");
const { authJwt } = require("../middlewares");
const donorRequest = require("../controllers/donorRequest.controller");

const router = Router();

router.post("/", [authJwt.verifyToken], donorRequest.create);
router.get("/", donorRequest.readAll);
router.get("/:id", donorRequest.readOne);
router.patch(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    donorRequest.update
);
router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    donorRequest.delete
);

module.exports = router;
