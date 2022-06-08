const { getScopedShops } = require("../services/shop");
const userService = require("../services/users");

const getDashboardUsers = async (req, res, next) => {
  try {
    const data = {};

    const { count, rows } = await userService.findAndCountUsers();

    data.users = {
      count,
      user: rows[0],
    };

    return res.json(data);
  } catch (err) {
    return next({
      status: 400,
      error: {
        message: err,
      },
    });
  }
};

const getDashboardPendingRequests = async (req, res, next) => {
  try {
    const data = {};

    const { count, rows } = await userService.findAndCountPendingUsers();

    data.pending = {
      count,
      user: rows[0],
    };

    return res.json(data);
  } catch (err) {
    return next({
      status: 400,
      error: {
        message: err,
      },
    });
  }
};

const getDashboardShops = async (req, res, next) => {
  try {
    const { id: userId, roleId } = req.decoded;

    const data = {};

    const { count, rows } = await getScopedShops(roleId, userId, true);

    data.shops = {
      count,
      shop: rows[0],
    };

    return res.json(data);
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
  getDashboardUsers,
  getDashboardPendingRequests,
  getDashboardShops,
};
