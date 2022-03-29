/* eslint-disable node/no-unsupported-features/es-syntax */
const { User, Permission, Role } = require("../models");
const { checkPassword, hashPassword } = require("../utils/hash");
const { createAccessToken } = require("../utils/token");

const loginUser = async (params) => {
  try {
    const { email, password: paramPassword } = params;

    const user = await User.findOne({
      where: { email },
      attributes: { exclude: "RoleId" },
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["title"],
          include: [
            {
              model: Permission,
              as: "permissions",
              attributes: ["title"],
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    });

    if (!user || !(await checkPassword(paramPassword, user.password))) {
      throw Error("Email or password is incorrect!");
    }

    if (user.status === "PENDING") {
      throw Error("Account has not been approved yet!");
    }

    const token = createAccessToken(user);

    const { id, password, passwordResetToken, ...rest } = user.dataValues;

    return { token, user: rest };
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

module.exports = {
  loginUser,
  registerUser,
};
