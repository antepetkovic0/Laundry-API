require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const models = require("./models");
const routes = require("./routes");

const PORT = process.env.PORT || 8000;

const app = express();
// app.use(helmet());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));

// app.get("/", async (req, res) => res.send("Hello world"));
app.use("/api", routes);

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.error
        ? err.error.message || "Internal Server Error"
        : "Internal Server Error",
    },
  });
});

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
