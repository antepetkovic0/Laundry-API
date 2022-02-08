/* eslint-disable node/no-unsupported-features/es-syntax */
const { User, Permission, Role } = require("../models");
const { checkPassword, hashPassword } = require("../utils/hash");
const { createAccessToken, verifyGoogleToken } = require("../utils/token");

const loginUser = async (params) => {
  try {
    const { email, password: paramPassword } = params;
    const user = await User.findOne({
      where: { email },
    });

    if (!user || !(await checkPassword(paramPassword, user.password))) {
      throw Error("Email or password is incorrect!");
    }

    if (user.status === "PENDING") {
      throw Error("Account has not been approved yet!");
    }

    const token = createAccessToken(user);
    return token;
  } catch (err) {
    throw err.message || "Failed to login user!";
  }
};

const registerUser = async (params) => {
  try {
    const { roleId, firstName, lastName, email, password, phone } = params;

    const hashedPassword = await hashPassword(password);
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        roleId,
        firstName,
        lastName,
        phone,
        password: hashedPassword,
        status: roleId === 2 ? "PENDING" : "ACTIVE",
      },
    });

    if (!created) {
      throw Error("User with given email already exists!");
    }

    return `Thank you for registering into our application! ${
      user.status === "PENDING"
        ? "Our team has been notified and you will receive activation email as soon as possible."
        : "Feel free to log in with your credentials."
    }`;
  } catch (err) {
    throw err.message || "Failed to register user!";
  }
};

const googleAuth = async (params) => {
  try {
    const { roleId, token } = params;
    const ticket = await verifyGoogleToken(token);
    const { given_name, family_name, email, picture } = ticket.getPayload();

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        roleId,
        picture,
        firstName: given_name,
        lastName: family_name,
        status: roleId === 2 ? "PENDING" : "ACTIVE",
      },
    });

    if (!created && user.status === "PENDING") {
      throw Error("Account has not been approved yet!");
    }

    if (created && user.status === "PENDING") {
      return {
        message:
          "Our team has been notified and you will receive activation email as soon as possible.",
      };
    }

    const accessToken = createAccessToken(user);
    return accessToken;
  } catch (err) {
    throw err.message || "Failed to register user!";
  }
};

const getProfile = async (userId) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Role,
          attributes: ["id", "title"],
          include: [
            {
              model: Permission,
              as: "permissions",
              attributes: ["title", "description"],
            },
          ],
        },
      ],
    });

    const { id, password, passwordResetToken, ...rest } = user.dataValues;
    console.log("rest", rest);
    return rest;
  } catch (err) {
    throw err.message || "Failed to login user!";
  }
};

module.exports = {
  loginUser,
  registerUser,
  googleAuth,
  getProfile,
};
