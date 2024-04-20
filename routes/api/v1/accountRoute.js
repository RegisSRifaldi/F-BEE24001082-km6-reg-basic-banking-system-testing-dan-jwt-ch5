const router = require("express").Router();

const accountController = require("../../../controllers/v1/accountController.js");
router.post("/account", accountController.store);
router.get("/account", accountController.index);
router.get("/account-profile", accountController.index2);
router.get("/account/:id", accountController.show);

module.exports = router;
