/* eslint-disable node/no-unsupported-features/es-syntax */
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const models = require("../models");
const { User, Pending_Registrations } = require("../models");
const MailService = require("../MailService");
const { checkPassword, hashPassword } = require("../utils/hash");

const loginUser = async (params) => {
  try {
    const { email, password: givenPass } = params;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await checkPassword(givenPass, user.password))) {
      throw Error("Email or password is incorrect!");
    }

    const payload = {
      roleId: user.roleId,
      email: user.email,
    };
    const token = jwt.sign(payload, "secret-password", { expiresIn: "1h" });
    const { password, hash, ...rest } = user.dataValues;
    return { token, rest };
  } catch (err) {
    throw err.message || "Failed to login user!";
  }
};

const registerUser = async (params) => {
  try {
    const { roleId, name, email, password, phone } = params;

    const isPending = await Pending_Registrations.findOne({ where: { email } });
    if (isPending) {
      throw Error("User with given email already exists!");
    }

    const hashedPassword = await hashPassword(password);
    const uuid = uuidv4();
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        roleId,
        name,
        phone,
        password: hashedPassword,
        hash: uuid,
      },
    });

    if (!created) {
      throw Error("User with given email already exists!");
    }

    // todo env secret pass
    const token = jwt.sign({ roleId }, "secret-password", { expiresIn: "1h" });
    return { token, roleId, name, email, phone };
  } catch (err) {
    throw err.message || "Failed to register user!";
  }
};

const registrationRequest = async (params) => {
  try {
    const { name, email, password, phone } = params;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      throw Error("User with given email already exists!");
    }

    const hashedPassword = await hashPassword(password);
    const uuid = uuidv4();
    const [_, created] = await Pending_Registrations.findOrCreate({
      where: { email },
      defaults: {
        name,
        phone,
        password: hashedPassword,
        hash: uuid,
      },
    });

    if (!created) {
      throw Error("User with the given email already exists!");
    }

    return "Thank you for registering into our application! Our team has been notified and you will receive activation email as soon as possible.";
  } catch (err) {
    console.log(err);
    throw err.message || "Failed to send registration request!";
  }
};

const getRegistrationRequests = async () => {
  try {
    const pending = await Pending_Registrations.findAll({
      order: [["createdAt", "DESC"]],
    });
    return pending;
  } catch (err) {
    // console.log("Transaction should be rolled back", err);
    throw Error("Error while getting pending registrations");
  }
};

const approveRegistrationRequest = async (hashNum) => {
  try {
    const transaction = await models.sequelize.transaction(async (t) => {
      const pendingUser = await Pending_Registrations.findOne({
        where: { hash: hashNum },
        transaction: t,
      });

      if (!pendingUser) {
        throw Error("Pending registration does not exist anymore!");
      }

      console.log("pp", pendingUser);

      const { name, email, phone, password, hash } = pendingUser;
      const createdUser = await User.create(
        { name, email, phone, password, hash, roleId: 2 },
        { transaction: t }
      );

      const payload = {
        name,
        url: `http://localhost:3000/auth`,
      };
      const mailInfo = {
        to: email,
        subject: "CleanZee - Account activated",
        template: "serviceApprove",
        context: payload,
        attachments: [],
      };
      const mailService = new MailService();
      await mailService.sendMail(mailInfo);

      await pendingUser.destroy({ transaction: t });
      console.log("created user", createdUser);
      return createdUser;
    });
    return transaction;
  } catch (err) {
    console.log("Transaction should be rolled back", err);
  }
};

const declineRegistrationRequest = async (hash) => {
  try {
    const deleted = await Pending_Registrations.destroy({ where: { hash } });
    if (!deleted) {
      throw Error("Failed to delete registration request!");
    }
  } catch (err) {
    console.log(err);
    throw err.message || "Error while declining request!";
  }
};

// const userActivation = async (req, res, next) => {
//   try {
//     const { hash } = req.params;
//     const activationMessage = await authService.userActivation(hash);
//     return res.status(200).json({ activationMessage });
//     const user = await PendingUser.findOne({ _id: hash });
//     const newUser = new User({ ...user });
//     await newUser.save();
//     await user.remove();
//     res.json({ message: `User ${hash} has been activated` });
//   } catch (err) {
//     return next({
//       status: 400,
//       error: {
//         message: err,
//       },
//     });
//   }
// };

// const approveRequest = async (email) => {};

module.exports = {
  loginUser,
  registerUser,
  registrationRequest,
  getRegistrationRequests,
  approveRegistrationRequest,
  declineRegistrationRequest,
};
