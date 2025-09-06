const express = require("express");
const cors = require("cors");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/orders.routes");
const paymentsRoutes = require("./routes/payments.routes");
const productsRoutes = require("./routes/products.routes");
const usersRoutes = require("./routes/users.routes");
require("./models");

const app = express();

app.use(cors())
app.use(express.json())

module.exports = app;