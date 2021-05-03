const authorizeUser = (roles = []) => {
  const userRoles = [...roles];
  console.log("user roles", userRoles);

  return (req, res, next) => {
    // console.log("req from authenticate", req.decoded);
    if (userRoles.length && !userRoles.includes(req.decoded.roleId)) {
      res.status(401).send({ message: "Unauthorized" });
    }
    next();
  };
};

module.exports = {
  authorizeUser,
};
