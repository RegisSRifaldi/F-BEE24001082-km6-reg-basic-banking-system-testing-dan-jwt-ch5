const path = require("path");
const router = require("express").Router();
const swaggerUI = require("swagger-ui-express");
const YAML = require("yaml");
const fs = require("fs");

const user = require("./userRoute");
const account = require("./accountRoute");
const transaction = require("./transactionRoute");

const swagger_path = path.resolve(__dirname, "../../../docs/api-docs.yaml");

const file = fs.readFileSync(swagger_path, "utf-8");

const swaggerDocument = YAML.parse(file);
router.use(
  "/api/v1/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
);

router.use("/api/v1", user);

router.use("/api/v1", account);

router.use("/api/v1", transaction);

module.exports = router;
