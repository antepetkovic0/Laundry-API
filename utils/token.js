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
    expiresIn: "15m",
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
  expiredAt.setSeconds(expiredAt.getSeconds() + 86400);

  const refreshTokenUUID = uuidv4();

  return {
    token: refreshTokenUUID,
    expiryDate: expiredAt.getTime(),
    userId,
  };
};

const verifyRefreshTokenExpiration = (token) =>
  token.expiryDate.getTime() < new Date().getTime();

const createResetPasswordTokenPayload = (userId) => {
  const expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + 300);

  return {
    token: uuidv4(),
    expiryDate: expiredAt.getTime(),
    userId,
  };
};

module.exports = {
  createAccessToken,
  verifyAccessToken,
  createRefreshTokenPayload,
  createResetPasswordTokenPayload,
  verifyRefreshTokenExpiration,
};
