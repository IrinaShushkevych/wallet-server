const express = require("express");

const { auth, validation, wrapper } = require("../../middlewares");
const { users: usersModel } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, wrapper(usersModel.getCurrent));

module.exports = router;
