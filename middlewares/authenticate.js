const { verifyAccessToken } = require("../utils/token");

const authenticateUser = async (req, res, next) => {
  const header = req.headers.authorization ?? "";
  const token = header.split(" ")[1];

  console.log("header", req.headers);

  if (token) {
    try {
      const decoded = await verifyAccessToken(token);
      req.decoded = decoded;
      return next();
    } catch (err) {
      return res.status(401).send("Failed to authenticate token!");
    }
  }
  return res.status(401).send("No provided token!");
};

module.exports = { authenticateUser };
