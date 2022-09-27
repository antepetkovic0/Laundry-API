const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (err) {
    throw Error("Error in hashing password.", err);
  }
};

const checkPassword = async (password, hash) => {
  try {
    const isMatching = await bcrypt.compare(password, hash);
    return isMatching;
  } catch (err) {
    throw Error("Failed to check password.", err);
  }
};

module.exports = { hashPassword, checkPassword };
