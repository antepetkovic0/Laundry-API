require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const db = require("./models");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors({ origin: "http://192.168.1.11:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message:
      err.message && typeof err.message === "string"
        ? err.message
        : "Internal Server Error",
  });
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database has been established successfully.");
    app.listen(PORT, "192.168.1.11", () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to database:", err);
  });
