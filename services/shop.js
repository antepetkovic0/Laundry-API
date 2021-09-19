/* eslint-disable node/no-unsupported-features/es-syntax */
const roles = require("../utils/roles");
const { Shop, User, Product } = require("../models");

const getScopedShops = async (roleId, userId) => {
  try {
    if (roleId === roles.OWNER) {
      console.log("we here");
      const shops = await Shop.findAll({
        where: { userId },
        include: [
          {
            model: User,
            attributes: ["firstName", "lastName"],
          },
          {
            model: Product,
            as: "products",
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      return shops;
    }

    console.log("we in user here");
    const shops = await Shop.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName"],
        },
        {
          model: Product,
          as: "products",
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return shops;
  } catch (err) {
    console.log(err);
    throw Error("blabal");
  }
};

const createShop = async (userId, shopParams) => {
  try {
    const {
      name,
      slug,
      address,
      image,
      about,
      firstName,
      lastName,
    } = shopParams;
    const [shop, created] = await Shop.findOrCreate({
      where: { userId, name },
      defaults: {
        slug,
        address,
        image,
        about,
      },
    });

    if (!created) {
      throw Error("Shop already exists!");
    }

    const user = {
      firstName,
      lastName,
    };
    return { ...shop.dataValues, User: user, products: [] };
  } catch (err) {
    throw err.message || "Failed to create shop!";
  }
};

const deleteShop = async (id, userId) => {
  try {
    const shop = await Shop.findOne({ where: { id } });
    if (!shop) {
      throw Error("Shop does not exists!");
    }

    if (shop.userId !== userId) {
      throw Error("You are not authorized to delete shop you did not create!");
    }

    await shop.destroy();
  } catch (err) {
    throw err.message || "Failed to delete shop!";
  }
};

module.exports = {
  getScopedShops,
  createShop,
  deleteShop,
};
