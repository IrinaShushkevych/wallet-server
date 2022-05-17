const { BadRequest } = require('http-errors');

const { Category } = require("../../models");

module.exports = async (req, res) => {
  const category = await Category.create({ ...req.body });

  if (!category) {
    throw new BadRequest("Creating a category failed.")
  }

  res.status(201).json({ status: "created", category });
};
