const express = require("express");
const cors = require("cors");
const paymentsRoutes = require("./routes/payments.routes");
const productsRoutes = require("./routes/products.routes");
const emailsRoutes = require("./services/emails");  
const usersRoutes = require("./routes/users.routes");
require("./models");

const app = express();

app.use(cors())
app.use(express.json())
app.use("/products", productsRoutes)
app.use(emailsRoutes)

module.exports = app;