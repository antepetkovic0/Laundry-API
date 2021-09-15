const userService = require("../services/user");

const getActiveUsers = async (req, res) => {
  try {
    const users = await userService.getActiveUsers();
    return res.json(users);
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

const getPendingUsers = async (req, res) => {
  try {
    const users = await userService.getPendingUsers();
    return res.json(users);
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

const approvePendingRequest = async (req, res, next) => {
  try {
    const { hash } = req.body;
    const user = await userService.approvePendingRequest(hash);
    return res.status(200).json(user);
  } catch (err) {
    return next({
      status: 400,
      error: {
        message: err,
      },
    });
  }
};

const declinePendingRequest = async (req, res, next) => {
  try {
    const { hash } = req.params;
    await userService.declinePendingRequest(hash);
    return res.sendStatus(200);
  } catch (err) {
    return next({
      status: 400,
      error: {
        message: err,
      },
    });
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
  getActiveUsers,
  getPendingUsers,
  approvePendingRequest,
  declinePendingRequest,
  getUserProfile,
  editUserProfile,
  deleteUserProfile,
  requestResetPassword,
};
