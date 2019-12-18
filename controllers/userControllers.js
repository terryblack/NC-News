const { fetchUserByUsername } = require('../models/userModels');

exports.getUserByUserName = (req, res, next) => {

  fetchUserByUsername(req.params.username)
    .then(user => {
      res.status(200).send({user});
    })
    .catch(next);
};
