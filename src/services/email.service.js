const { Resend } = require('resend');
const { ENV } = require('../lib/env');

const resend = new Resend(ENV.RESEND_API_KEY);

const sendOTP = async (to, otp) => {
    try {
        await resend.emails.send({
            from: `${ENV.EMAIL_FROM_NAME} <${ENV.EMAIL_FROM}>`,
            to: [to],
            subject: 'Danangscholar Security Verification Code',
            html: `
                <div style="
                    font-family: 'Segoe UI', Tahoma, sans-serif;
                    max-width: 420px;
                    margin: 20px auto;
                    padding: 24px;
                    border-radius: 10px;
                    background: #ffffff;
                    border: 1px solid #e6e9ec;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                ">
                    <h2 style="
                    color: #0078ff;
                    font-size: 20px;
                    margin-bottom: 8px;
                    text-align: center;
                    ">
                    Welcome to ${ENV.EMAIL_FROM_NAME}
                    </h2>
                    <p style="
                    color: #444;
                    font-size: 15px;
                    text-align: center;
                    margin: 10px 0 18px;
                    ">
                    Use the code below to verify your email address:
                    </p>

                    <div style="
                    font-size: 30px;
                    letter-spacing: 4px;
                    font-weight: bold;
                    color: #ffffff;
                    background: linear-gradient(135deg, #0078ff, #00c2ff);
                    text-align: center;
                    padding: 12px 0;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    ">
                    ${otp}
                    </div>

                    <p style="
                    color: #666;
                    font-size: 14px;
                    text-align: center;
                    margin: 0;
                    ">
                    This code will expire in <b>5 minutes</b>.
                    </p>

                    <p style="
                    color: #999;
                    font-size: 12px;
                    text-align: center;
                    margin-top: 16px;
                    ">
                    — ${ENV.EMAIL_FROM_NAME} Team
                    </p>
                </div>
            `,
        });
        console.log(`OTP sent successfully to ${to}`);
    } catch (error) {
        throw new Error('Failed to send OTP:', error);
    }
};

module.exports = {
    sendOTP,
}