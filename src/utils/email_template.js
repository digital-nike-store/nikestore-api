function EMAIL_NEW_ORDER_TEMPLATE(form) {
    return (
        `<body style="font-family: Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 500px; width: 100%; text-align: center;">
        <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Compra Confirmada!</h1>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">Obrigado pela sua compra! Estamos felizes em confirmar que seu pedido foi realizado com sucesso. Confira os detalhes abaixo:</p>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #333; font-size: 16px; margin: 10px 0;"><strong>Cliente:</strong> <span id="nome-produto">${form.fullName}</span></p>
            <p style="color: #333; font-size: 16px; margin: 10px 0;"><strong>Valor da compra:</strong> R$ <span id="valor-produto">${Number(form.total - form.shippingCost).toFixed(2)}</span></p>
            <p style="color: #333; font-size: 16px; margin: 10px 0;"><strong>Frete:</strong> R$ <span id="frete-produto">${form.shippingCost}</span></p>
            <p style="color: #333; font-size: 16px; margin: 10px 0;"><strong>Parcelas:</strong> <span id="quantidade-parcelas">${form.installments}</span></p>
            <p style="color: #333; font-size: 16px; margin: 10px 0;"><strong>Valor por Parcela:</strong> R$ <span id="valor-parcela">${((Number(form.total) + form.shippingCost) / Number(form.installments)).toFixed(2)}</span></p>
        </div>
        <p style="color: #555; font-size: 14px; line-height: 1.6;">Você receberá um e-mail com mais detalhes sobre o envio em breve. Se tiver alguma dúvida, entre em contato com nosso suporte.</p>
        <a href="#" style="display: inline-block; background-color: #28a745; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;">Acompanhar Pedido</a>
    </div>
</body>`
    )
}

const EMAIL_NEW_FAILED_ORDER_TEMPLATE =
    `<body style="font-family: Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 500px; width: 100%; text-align: center;">
        <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Compra Falhou!</h1>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">Infelizmente, houve um problema no processo de pagamento e sua compra falhou. Por favor, tente novamente ou entre em contato com nosso suporte.</p>
    </div>
</body>`


module.exports = {
    EMAIL_NEW_ORDER_TEMPLATE,
    EMAIL_NEW_FAILED_ORDER_TEMPLATE
}