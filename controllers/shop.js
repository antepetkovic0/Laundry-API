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

module.exports = {
  getShops,
};
