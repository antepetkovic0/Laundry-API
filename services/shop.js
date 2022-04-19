/* eslint-disable node/no-unsupported-features/es-syntax */
const roles = require("../utils/roles");
const { Shop, User, Product } = require("../models");

const findAllOwnerShops = async (userId) => {
  const shops = await Shop.findAll({
    where: { userId },
    include: [
      {
        model: User,
        as: "user",
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
};

const findAllShops = async () => {
  const shops = await Shop.findAll({
    include: [
      {
        model: User,
        as: "user",
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
};

const findAndCountOwnerShops = async (userId) => {
  const shops = await Shop.findAndCountAll({
    where: { userId },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["firstName", "lastName"],
      },
    ],
    limit: 1,
    order: [["createdAt", "DESC"]],
  });

  return shops;
};

const findAndCountShops = async () => {
  const shops = await Shop.findAndCountAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["firstName", "lastName"],
      },
    ],
    limit: 1,
    order: [["createdAt", "DESC"]],
  });

  return shops;
};

const getScopedShops = async (roleId, userId, forDashboardOverview = false) => {
  try {
    if (roleId === roles.OWNER && !forDashboardOverview) {
      const shops = await findAllOwnerShops(userId);

      return shops;
    }

    if (roleId === roles.OWNER && forDashboardOverview) {
      const shops = await findAndCountOwnerShops(userId);

      return shops;
    }

    if (roleId !== roles.OWNER && !forDashboardOverview) {
      const shops = await findAllShops();

      return shops;
    }

    const shops = await findAndCountShops();

    return shops;
  } catch (err) {
    console.log(err);
    throw Error("blabal");
  }
};

const getSpecificShop = async (roleId, userId, slug) => {
  try {
    const shop = await Shop.findOne({
      where: { slug },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName"],
        },
        {
          model: Product,
          as: "products",
        },
      ],
    });

    // if request was made by owner and he didnt create that shop return null
    // TODO: slug must be unique
    if (shop && shop.userId !== userId && roleId === roles.OWNER) {
      return null;
    }

    return shop;
  } catch (err) {
    console.log(err);
    throw Error("blblbl");
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

    return { ...shop.dataValues, user };
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
  getSpecificShop,
  createShop,
  deleteShop,
};
