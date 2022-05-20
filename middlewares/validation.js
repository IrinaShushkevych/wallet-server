const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "Not valid data. Try again.";
      next(error);
    }
    next();
  };
};

module.exports = validation;
