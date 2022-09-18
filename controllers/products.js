const productService = require("../services/products");

const getProducts = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    const { id: userId } = req.decoded;
    const { rows, count } = await productService.getProducts(shopId, userId);
    return res.json({ rows, count });
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

const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.json(product);
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

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.decoded;
    const product = await productService.updateProduct(id, userId, req.body);
    return res.json(product);
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

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.decoded;
    await productService.deleteProduct(id, userId);
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
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
