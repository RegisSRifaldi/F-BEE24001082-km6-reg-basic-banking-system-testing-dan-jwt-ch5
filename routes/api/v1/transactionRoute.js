const router = require("express").Router();

const transactionController = require("../../../controllers/v1/transactionController.js");
router.post("/transaction", transactionController.store);
router.get("/transaction", transactionController.index);
router.get("/transaction-profile", transactionController.index2);
router.get("/transaction/:id", transactionController.show);

module.exports = router;
