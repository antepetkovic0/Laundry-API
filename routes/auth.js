const express = require("express");
const {
  registerUser,
  registrationRequest,
  getRegistrationRequests,
  approveRegistrationRequest,
  declineRegistrationRequest,
  loginUser,
} = require("../controllers/auth");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const { validateRequest } = require("../middlewares/validator");
const schema = require("../utils/schemas");
const Role = require("../utils/roles");

const router = express.Router();

router.post("/register", validateRequest(schema.register), registerUser);

router.post("/request", validateRequest(schema.register), registrationRequest);

router.get(
  "/request",
  authenticateUser,
  authorizeUser([Role.ADMIN]),
  getRegistrationRequests
);

router.post(
  "/request/approval",
  authenticateUser,
  authorizeUser([Role.ADMIN]),
  approveRegistrationRequest
);

router.delete(
  "/request/approval/:hash",
  authenticateUser,
  authorizeUser([Role.ADMIN]),
  declineRegistrationRequest
);

// router.get("/activate/:hash", async (req, res) => {
//   const { hash } = req.params;
//   try {
//     const user = await PendingUser.findOne({ _id: hash });
//     const newUser = new User({ ...user });
//     await newUser.save();
//     await user.remove();
//     res.json({ message: `User ${hash} has been activated` });
//   } catch {
//     res.status(422).send("User cannot be activated!");
//   }
// });

router.post("/login", validateRequest(schema.login), loginUser);

router.post("/verify", authenticateUser, authorizeUser(), async (req, res) => {
  res.sendStatus(200);
});

// // hitting from front when owner is selected in registration
// router.post("/request", userController.registrationRequest);*2ws

module.exports = router;
