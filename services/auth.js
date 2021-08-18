const jwt = require("jsonwebtoken");
const hash = require("../utils/hash");
const { User, Pending_Registrations } = require("../models");

const loginUser = async (params) => {
  try {
    const { email, password } = params;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await hash.checkPassword(password, user.password))) {
      throw Error("Email or password is incorrect!");
    }

    const payload = {
      roleId: user.roleId,
      email: user.email,
    };

    const token = jwt.sign(payload, "secret-password", { expiresIn: "1h" });
    return { token, user };
  } catch (err) {
    throw err.message || "Failed to login user!";
  }
};

const registerUser = async (params) => {
  try {
    const { roleId, name, email, password, phone } = params;
    const hashed = await hash.hashPassword(password);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        roleId,
        name,
        phone,
        password: hashed,
      },
    });

    if (!created) {
      throw Error("User with the given email already exists!");
    }

    const token = jwt.sign({ roleId }, "secret-password", { expiresIn: "1h" });
    return { token, roleId, name, email, phone };
  } catch (err) {
    throw err.message || "Failed to register user!";
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
