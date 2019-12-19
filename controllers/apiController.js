const endpoints = require('../endpoints.json');
exports.getApiJson = (req, res, next) => {
  res.status(200).send({ endpoints });
};
