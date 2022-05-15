const wrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      console.log(`-----------------------------------------`);
      console.log(error.message);
      console.log(`-----------------------------------------`);
      next(error);
    }
  };
};

module.exports = wrapper;
