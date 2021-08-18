const userService = require("../services/user");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    return res.json(users);
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

const editUserProfile = async (req, res) => {
  try {
    const updatedUser = req.body;
    const userEmail = req.decoded.email;
    const response = await userService.editUserProfile(userEmail, updatedUser);
    return res.json({ status: 200, data: response });
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const userEmail = req.decoded.email;
    const response = await userService.deleteUserProfile(userEmail);
    return res.json({ status: 200, data: response });
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

const requestResetPassword = async (req, res) => {
  const passwordReset = await userService.requestPasswordReset(req.body.email);
  return res.json(passwordReset);
};

module.exports = {
  getUsers,
  getUserProfile,
  editUserProfile,
  deleteUserProfile,
  requestResetPassword,
};
