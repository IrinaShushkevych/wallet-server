const { Category } = require("../../models");

module.exports = async (req, res) => {
  const category = await Category.create({ ...req.body });

  res.status(201).json({ status: "created", category });
};
