async function processPaymentMock(payment) {
    setTimeout(async () => {
        try {
            const newStatus = Math.random() > 0.2 ? "PAID" : "FAILED"

            await fetch("http://localhost:3030/api/payments/callback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: payment.id, status: newStatus })
            })

            console.log(`Pagamento ${payment.id} simulado → status: ${newStatus}`)
        } catch (err) {
            console.error("Erro ao chamar callback:", err.message)
        }
    }, 3000)
}

module.exports = { processPaymentMock };
