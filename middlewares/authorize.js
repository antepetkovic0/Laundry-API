const authorizeUser = (roles = []) => (req, res, next) => {
  if (roles.length && !roles.includes(req.decoded.roleId)) {
    res.status(403).send("Unauthorized!");
  }

  next();
};

module.exports = {
  authorizeUser,
};
