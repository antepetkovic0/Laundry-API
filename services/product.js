const { Product, Shop } = require("../models");

const createProduct = async (params) => {
  try {
    const { shopId, name, slug, price, discount, image, content } = params;
    const [product, created] = await Product.findOrCreate({
      where: { shopId, name },
      defaults: {
        slug,
        price: Number(price),
        discount: Number(discount),
        image,
        content,
      },
    });
    if (!created) {
      throw Error("Product already exists!");
    }
    return product;
  } catch (err) {
    throw err.message || "Failed to create product!";
  }
};

const updateProduct = async (id, userId, updatedBody) => {
  try {
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      throw Error("Product does not exists!");
    }

    const shop = await Shop.findOne({ where: { id: product.shopId } });
    if (shop.userId !== userId) {
      throw Error(
        "You are not authorized to edit shop products you did not create!"
      );
    }

    Object.keys(updatedBody).forEach((key) => {
      product[key] = updatedBody[key];
    });
    await product.save();
    return product;
  } catch (err) {
    throw err.message || "Failed to update product!";
  }
};

const deleteProduct = async (id, userId) => {
  try {
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      throw Error("Product does not exists!");
    }

    const shop = await Shop.findOne({ where: { id: product.shopId } });
    if (shop.userId !== userId) {
      throw Error(
        "You are not authorized to delete shop products you did not create!"
      );
    }

    await product.destroy();
  } catch (err) {
    throw err.message || "Failed to delete product!";
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};
