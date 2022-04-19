const shopService = require("../services/shop");

const getShops = async (req, res) => {
  try {
    const { roleId, id } = req.decoded;
    const shops = await shopService.getScopedShops(roleId, id);
    return res.json(shops);
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

const getSpecificShop = async (req, res, next) => {
  try {
    const { roleId, id } = req.decoded;
    const { slug } = req.params;
    console.log("req params", req.params);
    const shop = await shopService.getSpecificShop(roleId, id, slug);
    return res.json(shop);
  } catch (err) {
    console.log("errr", err);
    return next({
      status: 400,
      error: {
        message: err,
      },
    });
  }
};

const createShop = async (req, res) => {
  try {
    const { id } = req.decoded;
    const shop = await shopService.createShop(id, req.body);
    return res.json(shop);
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

const deleteShop = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.decoded;
    await shopService.deleteShop(id, userId);
    return res.sendStatus(200);
  } catch (err) {
    console.log("errr", err);
    return next({
      status: 400,
      error: {
        message: err,
      },
    });
  }
};

module.exports = {
  getShops,
  getSpecificShop,
  createShop,
  deleteShop,
};
