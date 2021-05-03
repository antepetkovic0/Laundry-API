const jwt = require("jsonwebtoken");
const hash = require("../utils/hash");
const { User } = require("../models");

const registerUser = async (
  role,
  firstName,
  lastName,
  email,
  password,
  phoneNumber
) => {
  try {
    console.log(role, firstName, lastName, email, password, phoneNumber);
    console.log(typeof role);
    const hashed = await hash.hashPassword(password);
    const newUser = {
      roleId: role,
      firstName,
      lastName,
      email,
      password: hashed,
      phoneNumber,
    };

    const user = await User.create(newUser);
    return user;
  } catch (err) {
    console.log(err);
    throw Error("Error in registrating user.", err);
  }
};

const loginUser = async (userEmail, password) => {
  try {
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user || !(await hash.checkPassword(password, user.password))) {
      throw Error("Username or password is incorrect.");
    }

    const payload = {
      roleId: user.roleId,
      email: userEmail,
    };
    const token = jwt.sign(payload, "secret-password", { expiresIn: "1h" });
    const { roleId, email } = user;
    return { token, user: { roleId, email } };
  } catch (err) {
    throw Error("Error in login user.", err);
  }
};

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    throw Error(`Error while getting users. ${err}`);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};
