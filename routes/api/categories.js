const express = require("express");

const { categories } = require("../../controllers");
const { wrapper } = require('../../middlewares');

const router = express.Router();


router.get("/:type", wrapper(categories.getCategories));
router.post("/", wrapper(categories.addCategories));

module.exports = router;
