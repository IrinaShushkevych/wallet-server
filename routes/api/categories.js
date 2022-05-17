const express = require("express");

const { categories } = require("../../controllers");
const { wrapper, validation } = require('../../middlewares');
const { joiCategorySchema } = require('../../models')

const router = express.Router();


router.get("/:type", wrapper(categories.getCategories));
router.post("/", validation(joiCategorySchema), wrapper(categories.addCategories));

module.exports = router;
