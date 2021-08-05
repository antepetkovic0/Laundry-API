const hash = require("../utils/hash");
const { User, Pending_Registrations } = require("../models");

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

const approveRequest = async (email) => {};

module.exports = {
  registerUser,
  registrationRequest,
};
