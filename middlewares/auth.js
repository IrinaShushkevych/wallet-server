const jwt = require('jsonwebtoken');
const { Unauthorized, Conflict } = require('http-errors');
const { constantsStatus } = require('../libs');

const { User } = require('../models');

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new Unauthorized('Not authorized');
    }
    req.user = user;

    next();
  } catch (error) {
    if (error.message === 'invalid signature') {
      throw new Unauthorized('Not authorized');
      error.status = constantsStatus.HTTP_STATUS_CODE.UNAUTHORIZED;
    }
    next(error);
  }
};

module.exports = auth;
