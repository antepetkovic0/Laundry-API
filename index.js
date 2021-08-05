require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const models = require("./models");
const routes = require("./routes");

const PORT = process.env.PORT || 8000;

const app = express();
// app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/", async (req, res) => res.send("Hello world"));
app.use("/clean-api", routes);

// error handler
// app.use((error, req, res, next) => {
//   return res.status(error.status || 500).send({
//     error: {
//       status: error.status || 500,
//       message: error.error
//         ? error.error.message || "Internal Server Error"
//         : "Internal Server Error",
//       errorCode: error.errorCode,
//     },
//   });
// });

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
