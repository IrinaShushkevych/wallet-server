const express = require("express");

const { auth, wrapper } = require("../../middlewares");
const { users: usersModel } = require("../../controllers");

const router = express.Router();

router.get("/current", wrapper(auth), wrapper(usersModel.getCurrent));
router.patch("/", wrapper(auth), wrapper(usersModel.updateUser));

module.exports = router;
