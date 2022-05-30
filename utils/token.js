require("dotenv").config();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

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

const verifyAccessToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      return resolve(decoded);
    });
  });

const createRefreshTokenPayload = (userId) => {
  const expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + 120);

  const refreshTokenUUID = uuidv4();

  return {
    token: refreshTokenUUID,
    expiryDate: expiredAt.getTime(),
    userId,
  };
};

const verifyRefreshTokenExpiration = (token) =>
  token.expiryDate.getTime() < new Date().getTime();

module.exports = {
  createAccessToken,
  verifyAccessToken,
  createRefreshTokenPayload,
  verifyRefreshTokenExpiration,
};
