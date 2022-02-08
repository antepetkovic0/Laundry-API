const { verifyCustomToken } = require("../utils/token");

const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    try {
      const decoded = await verifyCustomToken(token);
      req.decoded = decoded;
      return next();
    } catch (err) {
      console.log("JWT error", err);
      return res
        .status(403)
        .send({ authenticationErr: "Failed to authenticate token!" });
    }
  }
  return res.status(403).send({ authenticationErr: "No provided token!" });
};

module.exports = { authenticateUser };
