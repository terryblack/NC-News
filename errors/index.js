exports.handle404s = (req, res, next) => {
  console.log("404 Error Log");
  res.status(404).send({ message: "Path not found" });
};

exports.customErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ message: err.message });
  else next(err);
};

exports.handle400s = (err, req, res, next) => {
  const errorCodes = ["23502", "22P02", "42703", "23503"];
  if (errorCodes.includes(err.code)) res.status(400).send({ message: "Bad request" });
  else next(err);
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ message: "Method not allowed on this path" });
};

exports.handle500s = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Internal Server Error!" });
};
