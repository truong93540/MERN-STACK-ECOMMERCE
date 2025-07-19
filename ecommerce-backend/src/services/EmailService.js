const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const sendEmailCreateOrder = (email, orderItems) => {
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let listItem = "";
    const attachImage = [];
    orderItems.forEach((order) => {
        listItem += `
        <div>
            Bạn đặt sản phẩm <b>${order.name}</b> với số lượng <b>${order.amount}</b> và giá là <b>${order.price} VND</b>
        </div>`;
        attachImage.push({ filename: order.image, path: order.image });
    });

    // Wrap in an async IIFE so we can use await.
    (async () => {
        const info = await transporter.sendMail({
            from: process.env.MAIL_ACCOUNT,
            to: process.env.MAIL_ACCOUNT,
            subject: "Bạn đã đặt hàng thành công",
            text: "Hello world?", // plain‑text body
            html: `<div><b>Bạn đã đặt hàng thành công</b></div>${listItem}`, // HTML body
            attachments: attachImage,
        });

        console.log("Message sent:", info.messageId);
    })();
};

module.exports = { sendEmailCreateOrder };
