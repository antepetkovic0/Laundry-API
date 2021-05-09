const jwt = require("jsonwebtoken");
const hash = require("../utils/hash");
const { User, Pending_Registrations } = require("../models");
const MailService = require("../MailService");

const registerUser = async (
  role,
  firstName,
  lastName,
  email,
  password,
  phoneNumber
) => {
  try {
    console.log(role, firstName, lastName, email, password, phoneNumber);
    console.log(typeof role);
    const hashed = await hash.hashPassword(password);
    const newUser = {
      roleId: role,
      firstName,
      lastName,
      email,
      password: hashed,
      phoneNumber,
    };

    const user = await User.create(newUser);
    return user;
  } catch (err) {
    console.log(err);
    throw Error("Error in registrating user.", err);
  }
};

const registrationRequest = async (
  firstName,
  lastName,
  email,
  password,
  phoneNumber
) => {
  try {
    const hashed = await hash.hashPassword(password);
    const request = {
      firstName,
      lastName,
      email,
      password: hashed,
      phoneNumber,
    };

    const regRequest = await Pending_Registrations.create(request);
    return regRequest;
  } catch (err) {
    console.log(err);
    throw Error("Error in saving registration request.");
  }
};

const loginUser = async (userEmail, password) => {
  try {
    const user = await User.findOne({ where: { email: userEmail } });
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
    throw Error("Error in login user.", err);
  }
};

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    throw Error(`Error while getting users. ${err}`);
  }
};

const getUserProfile = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    console.log("user profile", user);
    // sequelize returning user class -> dataValues but to variable is assigned json with user params
    return user;
  } catch (err) {
    throw Error(`Error while getting users. ${err}`);
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
  registerUser,
  loginUser,
  getUsers,
  getUserProfile,
  requestPasswordReset,
  registrationRequest,
};
