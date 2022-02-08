const express = require("express");
const {
  registerUser,
  googleAuth,
  registrationRequest,
  getRegistrationRequests,
  approveRegistrationRequest,
  declineRegistrationRequest,
  loginUser,
  getProfile,
} = require("../controllers/auth");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const { validateRequest } = require("../middlewares/validator");
const schema = require("../utils/schemas");
const Role = require("../utils/roles");

const router = express.Router();

router.post("/register", validateRequest(schema.register), registerUser);

router.post("/login", validateRequest(schema.login), loginUser);

router.post("/google", validateRequest(schema.googleAuth), googleAuth);

router.get("/profile", authenticateUser, authorizeUser(), getProfile);

module.exports = router;
