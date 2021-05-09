require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const models = require("./models");
const routes = require("./routes");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/clean-api", routes);

models.sequelize
  .sync()
  .then(() => {
    console.log("Database connection successful.");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error upon creating connection to db:", err);
  });

// THIS HITTING ROUTE /
// models.sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connection successful.");
//     app.listen(PORT, () => {
//       console.log(`Server listening on port ${PORT}.`);
//     });
//   })
//   .catch((err) => {
//     console.log("Error upon creating connection to db:", err);
//   });
