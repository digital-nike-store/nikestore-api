const { Payments } = require("../models");
const { processPaymentMock } = require("../services/processPaymentMock");

async function createPayment(req, res) {
    /*
    #swagger.tags = ['Payments']
    #swagger.summary = 'Criar um pagamento'
    #swagger.description = 'Cria um pagamento e inicia o processamento mockado.'
    */

    try {
        const payment = await Payments.create({
            ...req.body,
            status: "PENDING",
        })

        processPaymentMock(payment)
 
        res.status(201).send({
            message: "Pagamento iniciado",
            payment,
        })
    } catch (err) {
        res.status(500).send({ error: "Erro ao iniciar pagamento" })
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
        res.status(500).send({ error: "Erro ao consultar status" })
    }

    /*
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do pagamento',
        required: true,
        schema: { type: 'integer' }
    }
 
    #swagger.responses[200] = {
        description: "Detalhes do pagamento",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/PaymentResponse" }
            }
        }
    }
    #swagger.responses[404] = { description: "Pagamento não encontrado" }
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
        const payment = await Payments.findByPk(id)

        if (!payment) {
            return res.status(404).send({ error: "Pagamento não encontrado" })
        }

        await payment.update({ status })
        res.send({ message: `Pagamento ${id} atualizado para ${status}` })
    } catch (err) {
        res.status(500).send({ error: "Erro ao processar callback" })
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
    */
}

module.exports = {
    createPayment,
    getPaymentDetails,
    paymentCallback,
};