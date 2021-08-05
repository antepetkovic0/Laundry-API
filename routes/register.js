const express = require("express");
const { registerUser } = require("../controllers/user");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const val = require("../middlewares/validator");
const { registerSchema, loginSchema } = require("../utils/schemas");
const Role = require("../utils/roles");

const router = express.Router();

router.post("/", val.validateRequest(registerSchema), registerUser);

// // hitting from front when owner is selected in registration
// router.post("/request", userController.registrationRequest);

// // authorized admin
// router.post("/request/approval", userController.approveRegistrationRequest);
// router.delete("/request/approval", userController.declineRegistrationRequest);

module.exports = router;
