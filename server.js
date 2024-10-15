const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure Nodemailer transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
        user: 'your-gmail-account@gmail.com',
        pass: 'your-app-password'
    }
});

app.post('/send-email', async (req, res) => {
    const { to, senderName, senderEmail, subject, message } = req.body;

    try {
        await transporter.sendMail({
            from: senderEmail,
            to: to,
            subject: subject,
            text: `${senderName} (${senderEmail}) says:\n\n${message}`
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});