const LIMIT_LENGTH_NAME = {
  minLength: 1,
  maxLength: 12,
};

const LIMIT_LENGTH_EMAIL = {
  min: 10,
  max: 63,
  match: /^[0-9]/,
};

const LIMIT_LENGTH_PASSWORD = {
  minLength: 6,
  maxLength: 16,
};

const MIN_DOMAIN_SEGMENTS = 2;

module.exports = {
  LIMIT_LENGTH_NAME,
  LIMIT_LENGTH_EMAIL,
  LIMIT_LENGTH_PASSWORD,
  MIN_DOMAIN_SEGMENTS,
};
