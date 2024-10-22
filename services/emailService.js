
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
    
    port: 587,
    secure: false, 
    auth: {
        user: "jagarapujayadeep@gmail.com", 
        pass: "eurnqrwuroyadouo ", 
    },
});

export const sendEmail = async (to, subject, html, attachment, attachmentName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
        attachments: [
            {
                filename: attachmentName,
                content: attachment,
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to: ${to}`);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};
