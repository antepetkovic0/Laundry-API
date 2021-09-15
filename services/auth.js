/* eslint-disable node/no-unsupported-features/es-syntax */
const jwt = require("jsonwebtoken");
const { User, Permission, Role } = require("../models");
const { checkPassword, hashPassword } = require("../utils/hash");

const loginUser = async (params) => {
  try {
    const { email, password: givenPass } = params;
    const user = await User.findOne({
      where: { email },
    });

    if (!user || !(await checkPassword(givenPass, user.password))) {
      throw Error("Email or password is incorrect!");
    }

    if (user.status === "PENDING") {
      throw Error("Account has not been approved yet!");
    }

    const payload = {
      roleId: user.roleId,
      email: user.email,
      id: user.id,
    };
    const token = jwt.sign(payload, "secret-password", { expiresIn: "1h" });
    const { id, password, passwordResetToken, ...rest } = user.dataValues;
    return { token, rest };
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
  getProfile,
};
