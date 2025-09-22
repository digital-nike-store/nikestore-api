const express = require("express");
const router = express.Router();
const usersRoutes = require("./users.routes");

//const paymentsRoutes = require("./payments.routes");
const productsRoutes = require("./products.routes");

//router.use("/payments", paymentsRoutes);
router.use("/products", productsRoutes);
router.use("/users", usersRoutes);

module.exports = router;