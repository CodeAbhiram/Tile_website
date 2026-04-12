import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health route
app.get("/", (req, res) => {
  res.send("Server is running");
});


// 🔥 FIXED MAIL TRANSPORTER (NO "service: gmail")
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // must be true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000, // 10s
  greetingTimeout: 10000,
  socketTimeout: 10000,
});


// 🔥 VERIFY CONNECTION ON START (IMPORTANT)
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP ERROR:", err);
  } else {
    console.log("✅ SMTP READY");
  }
});


// 🔥 API ROUTE
app.post("/api/contact", async (req, res) => {
  console.log("📩 Incoming request:", req.body);

  const { name, phone, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields required",
    });
  }

  try {
    console.log("⏳ Sending email...");

    // ⏱️ Timeout wrapper to prevent hanging
    const mailPromise = transporter.sendMail({
      from: `"Website Inquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.CLIENT_EMAIL,
      subject: `New Inquiry - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color:#a67c63;">New Customer Inquiry</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Phone:</strong> 
            <a href="tel:${phone}">${phone}</a>
          </p>

          <p><strong>Message:</strong><br/> ${message}</p>

          <hr/>

          <p style="font-size: 12px; color: gray;">
            Submitted at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email timeout after 10s")), 10000)
    );

    await Promise.race([mailPromise, timeoutPromise]);

    console.log("✅ Email sent successfully");

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("❌ FULL ERROR:", error);
    console.error("❌ MESSAGE:", error.message);

    return res.status(500).json({
      success: false,
      message: "Email failed",
    });
  }
});


// 🔥 START SERVER (Render-compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});