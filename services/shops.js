/* eslint-disable node/no-unsupported-features/es-syntax */
const roles = require("../utils/roles");
const { Shop, User, Product } = require("../models");

const findOwnerShops = async (userId) =>
  Shop.findAll({
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

const findAllShops = async () =>
  Shop.findAll({
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

const countOwnerShops = async (userId) =>
  Shop.count({
    where: { userId },
  });

const countAllShops = async () => Shop.count();

const getScopedShops = async (roleId, userId) => {
  try {
    if (roleId === roles.OWNER) {
      const shops = await findOwnerShops(userId);
      return shops;
    }

    const shops = await findAllShops();
    return shops;
  } catch (err) {
    console.error(err);
    throw Error("Failed to fetch shops!");
  }
};

const countScopedShops = async (roleId, userId) => {
  try {
    if (roleId === roles.OWNER) {
      const total = await countOwnerShops(userId);
      return total;
    }

    const total = await countAllShops();
    return total;
  } catch (err) {
    console.error(err);
    throw Error("Failed to count shops!");
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
    throw Error("Failed to fetch shop!");
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

const editShop = async (userId, shopData) => {
  try {
    const shop = await Shop.findOne({ where: { id: shopData.id, userId } });

    if (!shop) {
      throw Error("Shop does not exists!");
    }

    Object.entries(shopData).forEach((column) => {
      const [columnName, columnValue] = column;
      shop[columnName] = columnValue;
    });

    await shop.save();
  } catch (err) {
    throw err.message || "Failed to edit shop!";
  }
};

const deleteShop = async (id, userId) => {
  try {
    const shop = await Shop.findOne({ where: { id, userId } });

    if (!shop) {
      throw Error("Shop does not exists!");
    }

    await shop.destroy();
  } catch (err) {
    throw err.message || "Failed to delete shop!";
  }
};

module.exports = {
  findOwnerShops,
  getScopedShops,
  countScopedShops,
  getSpecificShop,
  createShop,
  editShop,
  deleteShop,
};
