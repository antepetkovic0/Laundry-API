const { Op } = require("sequelize");
const { User } = require("../models");
const MailService = require("../MailService");

const getUsers = async (currentUserId) => {
  try {
    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: currentUserId,
        },
      },
      order: [["createdAt", "DESC"]],
    });

    return users;
  } catch (err) {
    throw Error("Error while getting users.");
  }
};

const countUsers = async () => {
  try {
    const active = await User.count({
      where: {
        status: {
          [Op.eq]: "ACTIVE",
        },
      },
    });

    const pending = await User.count({
      where: {
        status: {
          [Op.eq]: "PENDING",
        },
      },
    });

    const disabled = await User.count({
      where: {
        status: {
          [Op.eq]: "DISABLED",
        },
      },
    });

    return { active, pending, disabled };
  } catch (err) {
    throw Error("Error while counting users.");
  }
};

const approveUser = async (id) => {
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

    const payload = {
      name: `${user.firstName} ${user.lastName}`,
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
    mailService.sendMail(mailInfo);

    return user;
  } catch (err) {
    throw Error(err.message || "Failed to activate user account!");
  }
};

const deleteUser = async (id) => {
  try {
    await User.destroy({ where: { id } });
  } catch (err) {
    throw Error("Failed to delete user!");
  }
};

// TODO
const editUser = async (email, updatedUser) => {
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

// TODO
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
  mailService.sendMail(mailInfo);
  return "email sent";
};

module.exports = {
  getUsers,
  countUsers,
  approveUser,
  deleteUser,
  editUser,
  requestPasswordReset,
};
