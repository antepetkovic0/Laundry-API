const userService = require("../services/users");
const shopService = require("../services/shops");

const countUsers = async (req, res, next) => {
  try {
    const { active, pending, disabled } = await userService.countUsers();
    return res.json({ active, pending, disabled });
  } catch (err) {
    return next({
      status: 400,
      error: {
        message: err,
      },
    });
  }
};

const countShops = async (req, res, next) => {
  try {
    const { id: userId, roleId } = req.decoded;
    const total = await shopService.countScopedShops(roleId, userId);
    return res.json(total);
  } catch (err) {
    return next({
      status: 400,
      error: {
        message: err,
      },
    });
  }
};

module.exports = {
  countUsers,
  countShops,
};
