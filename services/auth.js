const jwt = require("jsonwebtoken");
const hash = require("../utils/hash");
const { User, Pending_Registrations } = require("../models");

const loginUser = async (params) => {
  try {
    const { email, password } = params;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await hash.checkPassword(password, user.password))) {
      throw Error("Email or password is incorrect.");
    }

    const payload = {
      roleId: user.roleId,
      email: user.email,
    };

    const token = jwt.sign(payload, "secret-password", { expiresIn: "1h" });
    return { token, user: payload };
  } catch (err) {
    console.log(err);
    throw Error(err.message || "Error in login user.");
  }
};

const registerUser = async (params) => {
  try {
    const { roleId, name, email, password, phone } = params;
    const hashed = await hash.hashPassword(password);

    const newUser = {
      roleId,
      name,
      email,
      password: hashed,
      phone,
    };

    const user = await User.create(newUser);
    return user;
  } catch (err) {
    console.log(err);
    throw Error("Error in registrating user.", err);
  }
};

const registrationRequest = async (params) => {
  try {
    const { name, email, password, phone } = params;
    const hashed = await hash.hashPassword(password);

    const request = {
      name,
      email,
      password: hashed,
      phone,
    };

    const regRequest = await Pending_Registrations.create(request);
    return regRequest;
  } catch (err) {
    console.log(err);
    throw Error("Error in saving registration request.");
  }
};

const approveRequest = async (email) => {};

module.exports = {
  loginUser,
  registerUser,
  registrationRequest,
};
