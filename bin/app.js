const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const authRouter = require("../routes/api/auth");
const usersRouter = require("../routes/api/users");
const categoriesRouter = require("../routes/api/categories");
const transactionsRouter = require("../routes/api/transactions");

const app = express();
const router = express.Router();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use("/wallet-api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/transactions", transactionsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});

module.exports = app;
