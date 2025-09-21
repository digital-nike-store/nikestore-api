// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();
const express = require('express');
const router = express.Router();
const juice = require('juice');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


router.post('/email', async (req, res) => {  

    const email = await req.body;
    console.log(email);
    res.send('Hello World!')

 const emailContent = {
    to: email.email,
    from: 'brenofacanha.ti@gmail.com',
    subject: 'Compra efetuada com sucesso',
    html: juice(`<body style="font-family: Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 500px; width: 100%; text-align: center;">
        <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Compra Confirmada!</h1>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">Obrigado pela sua compra! Estamos felizes em confirmar que seu pedido foi realizado com sucesso. Confira os detalhes abaixo:</p>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #333; font-size: 16px; margin: 10px 0;"><strong>Produto:</strong> <span id="nome-produto">${email.name}</span></p>
            <p style="color: #333; font-size: 16px; margin: 10px 0;"><strong>Valor do Produto:</strong> R$ <span id="valor-produto">${email.price}</span></p>
            <p style="color: #333; font-size: 16px; margin: 10px 0;"><strong>Frete:</strong> R$ <span id="frete-produto">${email.frete}</span></p>
            <p style="color: #333; font-size: 16px; margin: 10px 0;"><strong>Parcelas:</strong> <span id="quantidade-parcelas">${email.parcelas}</span></p>
            <p style="color: #333; font-size: 16px; margin: 10px 0;"><strong>Valor por Parcela:</strong> R$ <span id="valor-parcela">${((Number(email.price) + email.frete) / Number(email.parcelas)).toFixed(2)}</span></p>
        </div>
        <p style="color: #555; font-size: 14px; line-height: 1.6;">Você receberá um e-mail com mais detalhes sobre o envio em breve. Se tiver alguma dúvida, entre em contato com nosso suporte.</p>
        <a href="#" style="display: inline-block; background-color: #28a745; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;">Acompanhar Pedido</a>
    </div>
</body>`),
};

    try {
        await sgMail.send(emailContent);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }

})

module.exports = router;
