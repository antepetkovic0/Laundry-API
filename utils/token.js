require("dotenv").config();
const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
  const { id, roleId, email } = user;
  const payload = {
    id,
    roleId,
    email,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1m",
  });

  return token;
};

const verifyCustomToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      return resolve(decoded);
    });
  });

const verifyRefreshTokenExpiration = (token) =>
  token.expiryDate.getTime() < new Date().getTime();

module.exports = {
  createAccessToken,
  verifyCustomToken,
  verifyRefreshTokenExpiration,
};
