const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkout.controller");
const checkoutMiddleware = require("../middlewares/checkout");

router.post("/", checkoutMiddleware.validateCheckoutData, checkoutController.createCheckout);

module.exports = router;