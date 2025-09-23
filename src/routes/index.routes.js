const express = require("express");
const router = express.Router();

const checkoutRoutes = require("./checkout.routes");
const paymentsRoutes = require("./payments.routes");
const productsRoutes = require("./products.routes");
const usersRoutes = require("./users.routes");

router.use("/checkout", checkoutRoutes)
router.use("/payments", paymentsRoutes)
router.use("/products", productsRoutes)
// router.use("/users", usersRoutes)

module.exports = router;