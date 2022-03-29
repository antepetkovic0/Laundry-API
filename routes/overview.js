const express = require("express");
const { authenticateUser } = require("../middlewares/authenticate");
const { getScopedShops } = require("../services/shop");
const {
  findAndCountActiveUsers,
  findAndCountPendingUsers,
} = require("../services/user");
const roles = require("../utils/roles");

const router = express.Router();

router.get("/", authenticateUser, async (req, res, next) => {
  try {
    const { id: userId, roleId } = req.decoded;

    const data = {};

    const { count, rows } = await getScopedShops(roleId, userId, true);
    data.shops = {
      count,
      list: rows,
    };

    if (roleId === roles.ADMIN) {
      const {
        count: activeCount,
        rows: activeRows,
      } = await findAndCountActiveUsers();

      data.users = {
        count: activeCount,
        list: activeRows,
      };

      const {
        count: pendingCount,
        rows: pendingRows,
      } = await findAndCountPendingUsers();

      data.pending = {
        count: pendingCount,
        list: pendingRows,
      };
    }

    return res.json(data);
  } catch (err) {
    console.log("err", err);
    return next({
      status: 400,
      error: {
        message: err,
      },
    });
  }
});

module.exports = router;
