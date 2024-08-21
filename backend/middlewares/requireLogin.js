module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "you must log in" });
  } //if any error stop the middleware chain, we don't want to continue to the next middleware and crash the server

  next();
};
