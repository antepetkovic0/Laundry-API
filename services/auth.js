/* eslint-disable node/no-unsupported-features/es-syntax */
const { User, Permission, Role, RefreshToken } = require("../models");
const { checkPassword, hashPassword } = require("../utils/hash");
const {
  createAccessToken,
  createRefreshTokenPayload,
  verifyRefreshTokenExpiration,
} = require("../utils/token");

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

    const accessToken = createAccessToken(user);

    // if refresh exists first delete it
    const refreshToken = await RefreshToken.findOne({
      where: { userId: user.id },
    });

    if (refreshToken) {
      await RefreshToken.destroy({ where: { id: refreshToken.id } });
    }
    const newRefreshToken = await RefreshToken.create(
      createRefreshTokenPayload(user.id)
    );

    const { id, password, passwordResetToken, ...rest } = user.dataValues;

    return { user: rest, accessToken, refreshToken: newRefreshToken.token };
  } catch (err) {
    throw err.message || "Failed to login user!";
  }
};

const refreshTokens = async (token) => {
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

    if (!user) throw Error("Cannot find user.");

    const accessToken = createAccessToken(user);

    await RefreshToken.destroy({ where: { id: refreshToken.id } });
    const newRefreshToken = await RefreshToken.create(
      createRefreshTokenPayload(user.id)
    );

    return { accessToken, refreshToken: newRefreshToken.token };
  } catch (err) {
    console.error("RefreshToken.service: ", err);
    throw err.message || "Failed to refresh token!";
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshTokens,
};
