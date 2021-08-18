const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  // Authorization: Bearer <acces_token>
  // const header = req.headers.authorization;
  console.log("kolaciciciiii", req.cookies);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, "secret-password", (err, decoded) => {
      if (err) {
        res.send({ authenticationErr: "Failed to authenticate token!" });
      } else {
        console.log("decoded", decoded);
        // payload - { id, username, iat, exp }
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({ authenticationErr: "No provided token!" });
  }
};

module.exports = { authenticateUser };
