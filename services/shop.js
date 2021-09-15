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

const createShop = async (userId, shopParams) => {
  try {
    const { name, slug, address, image, about } = shopParams;
    const [shop, created] = await Shop.findOrCreate({
      where: { userId, name },
      defaults: {
        slug,
        address,
        image,
        about,
      },
    });
    console.log("created", created);
    if (!created) {
      throw Error("Shop already exists!");
    }
    return shop;
  } catch (err) {
    throw err.message || "Failed to create shop!";
  }
};

module.exports = {
  getScopedShops,
  createShop,
};
