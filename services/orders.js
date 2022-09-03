/* eslint-disable node/no-unsupported-features/es-syntax */
const roles = require("../utils/roles");
const { Shop, Order, Order_Item, Product, sequelize } = require("../models");
const { findOwnerShops } = require("./shops");

const findAllOrders = async () =>
  Order.findAll({
    include: [
      {
        model: Shop,
        as: "Shop",
        attributes: ["name", "image"],
      },
      {
        model: Product,
        as: "products",
      },
    ],
    order: [["createdAt", "DESC"]],
  });

const findCustomerOrders = async (userId) =>
  Order.findAll({
    where: { userId },
    include: [
      {
        model: Shop,
        as: "Shop",
        attributes: ["name", "image"],
      },
      {
        model: Product,
        as: "products",
      },
    ],
    order: [["createdAt", "DESC"]],
  });

const getScopedOrders = async (roleId, userId) => {
  try {
    if (roleId === roles.CUSTOMER) {
      const orders = await findCustomerOrders(userId);
      return orders;
    }

    const orders = await findAllOrders();

    if (roleId === roles.ADMIN) return orders;

    const ownerShops = await findOwnerShops(userId);
    const ownerShopsIds = ownerShops.map((shop) => shop.id);
    return orders.filter((order) => ownerShopsIds.includes(order.shopId));
  } catch (err) {
    console.error(err);
    throw Error("Failed to fetch orders!");
  }
};

const createOrder = async (userId, cart) => {
  const t = await sequelize.transaction();

  try {
    const { shopId } = cart[0];
    const status = "PENDING";
    const delivery = true;
    const shipping = 10;
    const tax = 25;
    const content = "";

    const calculateDiscountedPrice = (price, discount) => {
      const revertedDiscountForMultiply = 1 - Number(`0.${discount}`);
      return price * revertedDiscountForMultiply;
    };

    const subTotal = cart.reduce(
      (sum, product) =>
        sum +
        product.total *
          calculateDiscountedPrice(product.price, product.discount),
      0
    );

    const grandTotal = parseFloat(subTotal) + 10 + parseFloat(subTotal) * 0.25;

    const order = await Order.create(
      {
        shopId,
        userId,
        tax,
        delivery,
        shipping,
        status,
        content,
        grandTotal,
        total: subTotal,
      },
      { transaction: t }
    );

    // eslint-disable-next-line no-restricted-syntax
    for (const product of cart) {
      const { id, price, discount, total } = product;

      // eslint-disable-next-line no-await-in-loop
      await Order_Item.create(
        {
          price,
          discount,
          productId: id,
          orderId: order.id,
          quantity: total,
        },
        { transaction: t }
      );
    }

    await t.commit();

    const orderWithShopAndProducts = await Order.findOne({
      where: { id: order.id },
      include: [
        {
          model: Shop,
          as: "Shop",
          attributes: ["name", "image"],
        },
        {
          model: Product,
          as: "products",
        },
      ],
    });

    return orderWithShopAndProducts;
  } catch (err) {
    console.log(err);
    await t.rollback();
    throw err.message || "Failed to create shop!";
  }
};

module.exports = {
  getScopedOrders,
  createOrder,
  // editOrderStatus,
};
