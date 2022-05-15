const express = require("express");

const { auth, validation, wrapper } = require("../../middlewares");
const { auth: authModel } = require("../../controllers");
const { joiSchemaRegister, joiSchemaLogIn } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(joiSchemaRegister),
  wrapper(authModel.register)
);
router.post("/login", validation(joiSchemaLogIn), wrapper(authModel.login));
router.get("/logout", wrapper(auth), wrapper(authModel.logout));

module.exports = router;
