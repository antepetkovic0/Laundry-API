/* eslint-disable node/no-unsupported-features/es-syntax */
const { v4: uuidv4 } = require("uuid");
const { User, Permission, Role, RefreshToken } = require("../models");
const { checkPassword, hashPassword } = require("../utils/hash");
const {
  createAccessToken,
  verifyRefreshTokenExpiration,
} = require("../utils/token");

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

    // create access token
    const accessToken = createAccessToken(user);

    // create refresh token
    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + 120);
    const refreshTokenString = uuidv4();

    const refreshToken = await RefreshToken.create({
      token: refreshTokenString,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    });

    const { id, password, passwordResetToken, ...rest } = user.dataValues;

    return { user: rest, accessToken, refreshToken: refreshToken.token };
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

const refreshAccessToken = async (token) => {
  if (!token) throw Error("Refresh token is required.");

  try {
    const refreshToken = await RefreshToken.findOne({ where: { token } });

    if (!refreshToken) throw Error("Refresh token is not in the database.");

    if (verifyRefreshTokenExpiration(refreshToken)) {
      await RefreshToken.destroy({ where: { id: refreshToken.id } });

      throw Error("Refresh token has expired.");
    }

    const user = await User.findOne({
      where: { id: refreshToken.userId },
      attributes: ["id", "email", "roleId"],
    });
    console.log(user);
    if (!user) throw Error("Cannot find user.");

    const accessToken = createAccessToken(user);

    return { accessToken, refreshToken: refreshToken.token };
  } catch (err) {
    console.error("RefreshToken.service: ", err);
    throw err.message || "Failed to refresh token!";
  }
};

module.exports = {
  loginUser,
  registerUser,
  refreshAccessToken,
};
