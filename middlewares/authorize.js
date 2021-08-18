const authorizeUser = (roles = []) => (req, res, next) => {
  // in front for protected routes we will need to send what roles have permission
  const reqRoles = req.body.roles || [];
  const userRoles = [...new Set([...roles, ...reqRoles])];

  if (userRoles.length && !userRoles.includes(req.decoded.roleId)) {
    res.status(401).send({ authorizatonErr: "Unauthorized!" });
  }
  next();
};

module.exports = {
  authorizeUser,
};
