import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'nico.stark@ethereal.email',
        pass: 'rD2tkwjAnEDkG76tzM'
    }
});

export const ticketMail = async(data) => {
    const mail = {
        from: "nico.stark@ethereal.email",
        to: data.purchaser,
        subject: "compra realizada",
        text: "Plaintext version of the message",
        html: `
            <p>Fecha de la compra:${data.purchase_datetime}</p>
            <p>Monto de la compra:$${data.amount}</p>
        `
    }

    await transporter.sendMail(mail)
    return;
}