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

const createShop = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.decoded;
    const shop = await shopService.createShop(id, req.body);
    return res.json(shop);
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

module.exports = {
  getShops,
  createShop,
};
