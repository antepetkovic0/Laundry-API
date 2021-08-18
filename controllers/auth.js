const authService = require("../services/auth");

const loginUser = async (req, res, next) => {
  try {
    const { user, token } = await authService.loginUser(req.body);
    res.cookie("token", token, { httpOnly: false, secure: false });
    return res.status(200).json(user);
  } catch (err) {
    console.log("err in login controller", err);
    return next({
      status: 400,
      error: {
        message: err,
      },
    });
  }
};

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    return res.status(200).json({ user });
  } catch (err) {
    return next({
      status: 400,
      error: {
        message: err,
      },
    });
  }
};

const registrationRequest = async (req, res) => {
  try {
    const request = await authService.registrationRequest(req.body);
    return res.json({ status: 200, data: request });
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
  registrationRequest,
};
