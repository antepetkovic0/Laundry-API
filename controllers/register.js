const registerService = require("../services/register");

const registrationRequest = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const user = await registerService.registrationRequest(
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

module.exports = {
  registrationRequest,
};
