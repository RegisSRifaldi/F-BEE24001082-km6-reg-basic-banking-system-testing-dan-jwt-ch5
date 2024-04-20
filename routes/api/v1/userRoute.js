const router = require("express").Router();

const userController = require("../../../controllers/v1/userController");
router.post("/users", userController.store);
router.get("/users", userController.index);
router.get("/users-profile", userController.index2);
router.get("/users/:id", userController.show);

module.exports = router;
