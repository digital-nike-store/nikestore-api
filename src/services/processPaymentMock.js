const axios = require("axios");

async function processPaymentMock(payment) {
    setTimeout(async () => {
        try {
            const newStatus = Math.random() > 0.2 ? "PAID" : "FAILED"

            await axios.post("http://localhost:3030/payments/callback", {
                id: payment.id,
                status: newStatus,
            })

            console.log(`Pagamento ${payment.id} simulado → status: ${newStatus}`)
        } catch (err) {
            console.error("Erro ao chamar callback:", err.message)
        }
    }, 3000)
}

module.exports = { processPaymentMock };
