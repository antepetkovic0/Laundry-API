const authService = require("../services/auth");

const loginUser = async (req, res) => {
  try {
    const user = await authService.loginUser(req.body);
    return res.json({ status: 200, data: user });
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    return res.json({ status: 200, data: user });
  } catch (err) {
    return res.json({ status: 400, message: err.message });
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
