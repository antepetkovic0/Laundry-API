const orderService = require("../services/orders");

const getOrders = async (req, res) => {
  try {
    const { roleId, id } = req.decoded;
    const orders = await orderService.getScopedOrders(roleId, id);
    return res.json(orders);
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { id } = req.decoded;
    const order = await orderService.createOrder(id, req.body);
    return res.json(order);
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

// const editOrderStatus = async (req, res) => {
//   try {
//     const { id: userId } = req.decoded;
//     await orderService.editOrderStatus(userId, req.body);
//     return res.sendStatus(200);
//   } catch (err) {
//     return res.json({ status: 400, message: err.message });
//   }
// };

module.exports = {
  getOrders,
  createOrder,
  // editOrderStatus,
};
