const { Orders } = require("../models");
const { createPaymentService } = require("../services/payment.service");
const { processPaymentMock } = require("../services/processPaymentMock");

async function createCheckout(req, res) {
    const t = await Orders.sequelize.transaction();

    try {
        const { orderData, paymentData } = req;

        const order = await Orders.create(
            orderData,
            { transaction: t }
        )

        const payment = await createPaymentService(
            { orderId: order.id, ...paymentData },
            t
        )

        await t.commit()

        processPaymentMock(payment)

        res.status(201).send({
            message: "Checkout iniciado",
            order,
            payment,
        })
    } catch (err) {
        await t.rollback()

        res.status(500).send({ error: "Erro ao iniciar checkout" })
    }
}

module.exports = { createCheckout };
