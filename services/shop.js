const roles = require("../utils/roles");
const { Shop } = require("../models");

const getScopedShops = async (roleId, userId) => {
  try {
    if (roleId === roles.OWNER) {
      const shops = await Shop.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
      });
      return shops;
    }
    const shops = await Shop.findAll({ order: [["createdAt", "DESC"]] });
    return shops;
  } catch (err) {
    console.log(err);
    throw Error("blabal");
  }
};

module.exports = {
  getScopedShops,
};
