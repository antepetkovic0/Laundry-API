const validateRequest = (schema) => (req, res, next) => {
  const options = {
    abortEarly: false,
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    res.status(422).send({
      message: "Invalid input. Please try again!",
    });
  } else {
    req.body = value;
    next();
  }
};

module.exports = { validateRequest };
