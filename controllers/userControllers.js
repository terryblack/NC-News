const { fetchUserByUsername } = require('../models/userModels');

exports.getUserByUserName = (req, res, next) => {
  const username = req.params.username;
  fetchUserByUsername(username)
    .then(user => {
      res.status(200).send({user});
    })
    .catch(next);
};
