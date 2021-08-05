const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const { validateRequest } = require("../middlewares/validator");
const schema = require("../utils/schemas");
const Role = require("../utils/roles");

const router = express.Router();

// for admin and user
router.post("/register", validateRequest(schema.register), registerUser);

// for service
router.post("/request", validateRequest(schema.register), registerUser);
// // authorized admin
// router.post("/request/approval", userController.approveRegistrationRequest);
// router.delete("/request/approval", userController.declineRegistrationRequest);

router.post("/login", loginUser);

// // hitting from front when owner is selected in registration
// router.post("/request", userController.registrationRequest);*2ws

module.exports = router;
