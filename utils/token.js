require("dotenv").config();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createAccessToken = (user) => {
  const { id, roleId, email } = user;
  const payload = {
    id,
    roleId,
    email,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  return ticket;
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

module.exports = { createAccessToken, verifyGoogleToken, verifyCustomToken };
