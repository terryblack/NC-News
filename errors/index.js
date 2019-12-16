exports.handle404s = (req, res, next) => {
  console.log('404 Error Log');
  res.status(404).send({ message: 'Path not found' });
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ message: 'Invalid method' });
};


exports.handle500s = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: 'Internal Server Error!' });
};
