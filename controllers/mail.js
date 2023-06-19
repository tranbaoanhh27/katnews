"use strict";

const Mailjet = require("node-mailjet");

const sendResetPasswordMail = (host, otp, user) => {
    const mailjet = Mailjet.apiConnect(
        process.env.MJ_APIKEY_PUBLIC,
        process.env.MJ_APIKEY_PRIVATE
    );

    const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Email: "20120250@student.hcmus.edu.vn",
                    Name: "Katnews Customer Service",
                },
                To: [
                    {
                        Email: user.email,
                        Name: `${user.fullName}`,
                    },
                ],
                Subject: "[Katnews] Đặt lại mật khẩu",
                HTMLPart: `
                        <p>Xin chào ${user.fullName},</p>
                        <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản ${host} của bạn. Sử dụng mã OTP dưới dây để tiếp tục.</p>
                        <h1 style="color: #7d6090; letter-spacing: 5px;">${otp}</h1>
                        <p style="color: red;">Lưu ý rằng mã OTP này sẽ hết hạn sau 5 phút!.</p>
                        <p>Nếu bạn không phải là người yêu cầu đặt lại mật khẩu, hãy bỏ qua email này hoặc phản hồi cho chúng tôi biết</p>
                        <p>Trân trọng,</p>
                        <p>Katnews Customer Service</p>
                `,
            },
        ],
    });

    return request;
};

module.exports = { sendResetPasswordMail };