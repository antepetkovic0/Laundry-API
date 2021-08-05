const jwt = require("jsonwebtoken");
const hash = require("../utils/hash");
const { User, Pending_Registrations } = require("../models");
const MailService = require("../MailService");

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    throw Error("Error while getting all users.");
  }
};

const getUserProfile = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    console.log("user profile", user);
    // sequelize returning user class -> dataValues but to variable is assigned json with user params
    return user;
  } catch (err) {
    throw Error("Error while getting user profile.");
  }
};

const editUserProfile = async (email, updatedUser) => {
  try {
    const user = await User.findOne({ where: { email } });
    // sequelize returning user class -> dataValues but to variable is assigned json with user params
    Object.keys(updatedUser).forEach((prop) => {
      user[prop] = updatedUser[prop];
    });
    await user.save();
    // return user;
    return "User profile successfully updated";
  } catch (err) {
    throw Error("Error while getting user profile.");
  }
};

const deleteUserProfile = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    await user.destroy();
    return "User account has been successfully deleted";
  } catch (err) {
    throw Error("Error while deleting user account.");
  }
};

const loginUser = async (userEmail, password) => {
  try {
    const user = await User.findOne({ where: { email: userEmail } });
    console.log("user from login", user);
    if (!user || !(await hash.checkPassword(password, user.password))) {
      throw Error("Username or password is incorrect.");
    }

    const payload = {
      roleId: user.roleId,
      email: userEmail,
    };
    const token = jwt.sign(payload, "secret-password", { expiresIn: "1h" });
    const { roleId, email } = user;
    return { token, user: { roleId, email } };
  } catch (err) {
    console.log(err);
    throw Error(err.message || "Error in login user.");
  }
};

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ where: { email } });
  console.log(user);
  if (!user) throw Error("Email does not exist");

  const payload = {
    name: user.firstName,
  };

  const mailInfo = {
    to: email,
    subject: "WelcomeMail",
    template: "welcome",
    context: payload,
    attachments: [],
  };

  const mailService = new MailService();
  await mailService.sendMail(mailInfo);
  return "email sent";
};

module.exports = {
  getUsers,
  getUserProfile,
  editUserProfile,
  deleteUserProfile,
  loginUser,
  requestPasswordReset,
};
