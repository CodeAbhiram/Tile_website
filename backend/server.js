import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health route (important for Render + uptime)
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API route (matches your frontend)
app.post("/api/contact", async (req, res) => {
  const { name, phone, message } = req.body;

  // Basic validation
  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  try {
    await transporter.sendMail({
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

    res.status(200).json({ success: true });

  } catch (error) {
  console.error("FULL ERROR:", error);
  console.error("ERROR MESSAGE:", error.message);
  console.error("STACK:", error.stack);

  res.status(500).json({ success: false });
}
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});