const authService = require("../services/auth");

const loginUser = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.loginUser(
      req.body
    );

    res.cookie("refresh-token", refreshToken, {
      httpOnly: false,
      secure: false,
    });

    return res.status(200).json({ user, accessToken });
  } catch (err) {
    console.log("here error", err);
    return next({
      status: 400,
      message: err,
    });
  }
};

const registerUser = async (req, res, next) => {
  try {
    const message = await authService.registerUser(req.body);
    return res.status(200).json({ message });
  } catch (err) {
    return next({
      status: 400,
      message: err,
    });
  }
};

const refreshTokens = async (req, res, next) => {
  try {
    const { token } = req.body;
    const { accessToken, refreshToken } = await authService.refreshTokens(
      token
    );

    res.cookie("refresh-token", refreshToken, {
      httpOnly: false,
      secure: false,
    });

    return res.status(200).json({ accessToken });
  } catch (err) {
    return next({
      status: 400,
      message: err,
    });
  }
};

const requestResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const message = await authService.requestResetPassword(email);
    return res.status(200).json({ message });
  } catch (err) {
    return next({
      status: 400,
      message: err,
    });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password, token, userId } = req.body;
    await authService.resetPassword(password, token, userId);
    return res.sendStatus(200);
  } catch (err) {
    return next({
      status: 400,
      message: err,
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
  refreshTokens,
  requestResetPassword,
  resetPassword,
};
