const express = require("express");
const cors = require("cors");
const models = require("./models");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/clean-api", routes);

models.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection successful.");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log("Error upon creating connection to db:", err);
  });
