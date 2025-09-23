const sgMail = require('@sendgrid/mail');
const { EMAIL_NEW_FAILED_ORDER_TEMPLATE, EMAIL_NEW_ORDER_TEMPLATE } = require('../utils/email_template');
const juice = require('juice');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendNewOrderEmail(order, payment) {
    let emailContent = {};

    const form = {
        fullName: order.fullName,
        email: order.email,
        total: Number(order.total - order.shippingCost),
        shippingCost: Number(order.shippingCost),
        installments: payment.installments || 1
    }

    console.log(form.email)

    if (payment.status === "PAID") {
        emailContent = {
            to: form.email,
            from: 'denilsonbezerra.10@hotmail.com',
            subject: 'Compra efetuada com sucesso',
            html: juice(EMAIL_NEW_ORDER_TEMPLATE(form)),
        }
    }

    if (payment.status === "FAILED") {
        emailContent = {
            to: form.email,
            from: 'denilsonbezerra.10@hotmail.com',
            subject: 'Compra falhou',
            html: juice(EMAIL_NEW_FAILED_ORDER_TEMPLATE),
        }
    }

    try {
        await sgMail.send(emailContent)

        console.log('Email sent successfully')
    } catch (error) {
        console.error('Error sending email:', error)
    }
}

module.exports = { sendNewOrderEmail }