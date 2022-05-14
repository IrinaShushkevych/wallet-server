const { Category } = require('../../models');

module.exports = async (req, res) => {
  const { type } = req.params;

  let categories = [];

  if (type === "income") {
    categories = await Category.find({income: true})
  }

  if (type === "expense") {
    categories = await Category.find({income: false})
  }

  if (categories.length === 0) {
    throw new Error('Not found')
  }

  res.status(200).json({ status: "success", categories });
}
