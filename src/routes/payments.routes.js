const express = require("express");
const router = express.Router();
const paymentsMiddleware = require("../middlewares/payments");
const paymentsController = require("../controllers/payments.controller");

router.post(
    "/",
    paymentsMiddleware.validateCreatePayment,
    paymentsController.createPayment
)

router.get(
    "/:id",
    paymentsController.getPaymentDetails
)

router.post(
    "/callback",
    paymentsController.paymentCallback
)

module.exports = router;