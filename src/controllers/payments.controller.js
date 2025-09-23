const { Payments, Orders } = require("../models");
const { sendNewOrderEmail } = require("../services/emails");
const { createPaymentService } = require("../services/payment.service");
const { processPaymentMock } = require("../services/processPaymentMock");

async function createPayment(req, res) {
    /*
    #swagger.tags = ['Payments']
    #swagger.summary = 'Criar um pagamento'
    #swagger.description = 'Cria um pagamento e inicia o processamento mockado.'
    */

    try {
        const payment = await createPaymentService(req.body);
        processPaymentMock(payment);

        res.status(201).send({
            message: "Pagamento iniciado",
            payment,
        });
    } catch (err) {
        res.status(500).send({ error: "Erro ao iniciar pagamento" });
    }

    /*
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/PaymentInput" }
            }
        }
    }

    #swagger.responses[201] = {
        description: "Pagamento iniciado com sucesso",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/PaymentResponse" }
            }
        }
    }

    #swagger.responses[500] = {
        description: "Erro ao consultar detalhes do pagamento",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        error: { type: "string", example: "Erro ao iniciar o pagamento" }
                    }
                }
            }
        }
    }
    */
}

async function getPaymentDetails(req, res) {
    /*
    #swagger.tags = ['Payments']
    #swagger.summary = 'Consultar um pagamento'
    #swagger.description = 'Busca os detalhes de um pagamento pelo seu ID.'
    */

    try {
        const { id } = req.params
        const payment = await Payments.findByPk(id)

        if (!payment) {
            return res.status(404).send({ error: "Pagamento não encontrado" })
        }

        res.send({ payment })
    } catch (err) {
        res.status(500).send({ error: "Erro ao consultar detalhes do pagamento" })
    }

    /*
    #swagger.responses[200] = {
        description: "Detalhes do pagamento",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/Payment" }
            }
        }
    }

    #swagger.responses[404] = {
        description: "Pagamento não encontrado",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        error: { type: "string", example: "Pagamento não encontrado" }
                    }
                }
            }
        }
    }

    #swagger.responses[500] = {
        description: "Erro ao consultar detalhes do pagamento",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        error: { type: "string", example: "Erro ao consultar detalhes do pagamento" }
                    }
                }
            }
        }
    }
    */
}

async function paymentCallback(req, res) {
    /*
    #swagger.tags = ['Payments']
    #swagger.summary = 'Callback de pagamento'
    #swagger.description = 'Atualiza o status de um pagamento através de um webhook simulado.'
    */

    try {
        const { id, status } = req.body
        const payment = await Payments.findByPk(id, { include: [{ model: Orders, as: "order" }] })

        if (!payment) {
            return res.status(404).send({ error: "Pagamento não encontrado" })
        }

        await payment.update({ status })

        await sendNewOrderEmail(payment.order, payment).catch(err => console.log(err.message))

        res.send({ message: `Pagamento ${id} atualizado para ${status}` })
    } catch (err) {
        res.status(500).send({ error: "Erro ao processar o pagamento" });
    }


    /*
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/PaymentCallbackInput" }
            }
        }
    }
    
    #swagger.responses[200] = {
        description: "Status atualizado com sucesso",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/PaymentCallbackResponse" }
            }
        }
    }
        
    #swagger.responses[404] = {
        description: "Pagamento não encontrado",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        error: { type: "string", example: "Pagamento não encontrado" }
                    }
                }
            }
        }
    }

    #swagger.responses[500] = {
        description: "Erro ao consultar detalhes do pagamento",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        error: { type: "string", example: "Erro ao processar o pagamento" }
                    }
                }
            }
        }
    }
    */
}

module.exports = {
    createPayment,
    getPaymentDetails,
    paymentCallback,
};