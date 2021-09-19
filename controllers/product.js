const productService = require("../services/product");

const createProduct = async (req, res, next) => {
  try {
    console.log("prodc", req.body);
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
  createProduct,
  deleteProduct,
};
