const validateRequest = (schema) => (req, res, next) => {
  // including all errors
  const options = {
    abortEarly: false,
  };
  console.log("validating", req.body);
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    console.log("err", error);
    // removing "" from validation error messages
    res.status(422).send({
      // validationError: error.details.map((x) => x.message.replace(/"/g, "")),
      error: {
        message: "Invalid input",
      },
    });
  } else {
    req.body = value;
    next();
  }
};

module.exports = { validateRequest };
