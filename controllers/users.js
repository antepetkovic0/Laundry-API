const userService = require("../services/users");

const getUsers = async (req, res) => {
  try {
    const currentUserId = req.decoded.id;
    const users = await userService.getUsers(currentUserId);
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.json({ status: 400, message: err.message });
  }
};

const approveUser = async (req, res, next) => {
  try {
    const { hash } = req.body;
    const user = await userService.approveUser(hash);
    return res.status(200).json(user);
  } catch (err) {
    return next({
      status: 400,
      error: {
        message: err.message,
      },
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { hash } = req.params;
    await userService.deleteUser(hash);
    return res.sendStatus(200);
  } catch (err) {
    return next({
      status: 400,
      error: {
        message: err.message,
      },
    });
  }
};

// TODO
const editUser = async (req, res) => {
  try {
    const updatedUser = req.body;
    const userEmail = req.decoded.email;
    const response = await userService.editUser(userEmail, updatedUser);
    return res.json({ status: 200, data: response });
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

// TODO
const requestResetPassword = async (req, res) => {
  const passwordReset = await userService.requestPasswordReset(req.body.email);
  return res.json(passwordReset);
};

module.exports = {
  getUsers,
  approveUser,
  deleteUser,
  editUser,
  requestResetPassword,
};
