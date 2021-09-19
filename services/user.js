const { Op } = require("sequelize");
const { User } = require("../models");
const MailService = require("../MailService");

const getActiveUsers = async () => {
  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [{ status: "ACTIVE" }, { status: "DISABLED" }],
      },
      order: [["createdAt", "DESC"]],
    });
    // console.log(users);
    return users;
  } catch (err) {
    throw Error("Error while getting active users.");
  }
};

const getPendingUsers = async () => {
  try {
    const users = await User.findAll({
      where: { status: "PENDING" },
      order: [["createdAt", "DESC"]],
    });
    return users;
  } catch (err) {
    throw Error("Error while getting pending users.");
  }
};

const approvePendingRequest = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.and]: [{ status: "PENDING" }, { id }],
      },
    });

    if (!user) {
      throw Error("Request does not exist anymore!");
    }

    user.status = "ACTIVE";
    await user.save();

    const name = `${user.firstName} ${user.lastName}`;
    const payload = {
      name,
      url: `http://localhost:3000/auth`,
    };

    const mailInfo = {
      to: user.email,
      subject: "CleanZee - Account activated",
      template: "serviceApprove",
      context: payload,
      attachments: [],
    };
    const mailService = new MailService();
    await mailService.sendMail(mailInfo);
    return user;
  } catch (err) {
    console.log("Error", err);
  }
};

const declinePendingRequest = async (id) => {
  try {
    await User.destroy({ where: { id } });
  } catch (err) {
    throw Error("Failed to delete pending request!");
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
  getActiveUsers,
  getPendingUsers,
  approvePendingRequest,
  declinePendingRequest,
  getUserProfile,
  editUserProfile,
  deleteUserProfile,
  requestPasswordReset,
};
