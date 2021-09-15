const authService = require("../services/auth");

const loginUser = async (req, res, next) => {
  try {
    const { rest: user, token } = await authService.loginUser(req.body);
    res.cookie("token", token, { httpOnly: false, secure: false });
    // return res.sendStatus(200).json(user);
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

const registerUser = async (req, res, next) => {
  try {
    const message = await authService.registerUser(req.body);
    return res.status(200).json({ message });
  } catch (err) {
    return next({
      status: 400,
      error: {
        message: err,
      },
    });
  }
};

const getProfile = async (req, res, next) => {
  try {
    console.log("kol", req.decoded);
    const user = await authService.getProfile(req.decoded.id);
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

const registrationRequest = async (req, res, next) => {
  try {
    const requestMessage = await authService.registrationRequest(req.body);
    return res.status(200).json({ requestMessage });
  } catch (err) {
    return next({
      status: 400,
      error: {
        message: err,
      },
    });
  }
};

const getRegistrationRequests = async (req, res, next) => {
  try {
    const pending = await authService.getRegistrationRequests();
    return res.status(200).json(pending);
  } catch (err) {
    console.log("errrr", err);
    return next({
      status: 400,
      error: {
        message: err.message || err,
      },
    });
  }
};

const approveRegistrationRequest = async (req, res, next) => {
  try {
    const { hash } = req.body;
    const user = await authService.approveRegistrationRequest(hash);
    console.log("user in controller", user);
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

const declineRegistrationRequest = async (req, res, next) => {
  try {
    const { hash } = req.params;
    await authService.declineRegistrationRequest(hash);
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

module.exports = {
  loginUser,
  registerUser,
  getProfile,
  registrationRequest,
  getRegistrationRequests,
  approveRegistrationRequest,
  declineRegistrationRequest,
  // userActivation,
};
