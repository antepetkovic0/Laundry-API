const userService = require("../services/user");

const registerUser = async (req, res) => {
  try {
    const {
      roleId,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    } = req.body;

    const user = await userService.registerUser(
      roleId,
      firstName,
      lastName,
      email,
      password,
      phoneNumber
    );
    return res.json({ status: 200, data: user });
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    return res.json({ status: 200, data: user });
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    return res.json({ status: 200, data: users });
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userEmail = req.decoded.email;
    const user = await userService.getUserProfile(userEmail);
    return res.json({ status: 200, data: user });
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

const requestResetPassword = async (req, res) => {
  const passwordReset = await userService.requestPasswordReset(req.body.email);
  return res.json(passwordReset);
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserProfile,
  requestResetPassword,
};
