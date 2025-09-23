const { Payments } = require("../models");

async function createPaymentService(data, transaction = null) {
  const payment = await Payments.create(
    {
      orderId: data.orderId,
      amount: Number(data.amount),
      currency: data.currency,
      method: data.method,
      installments: data.installments,
      status: "PENDING",
    },
    transaction ? { transaction } : {}
  )

  return payment;
}

module.exports = { createPaymentService };