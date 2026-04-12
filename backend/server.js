import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health route
app.get("/", (req, res) => {
  res.send("Server is running");
});


// 🔥 Brevo setup
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();


// 🔥 API route
app.post("/api/contact", async (req, res) => {
  console.log("📩 Incoming:", req.body);

  const { name, phone, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ success: false });
  }

  try {
    console.log("⏳ Sending email via Brevo...");

    await emailApi.sendTransacEmail({
      sender: {
        name: "Raya New Client",
        email: process.env.CLIENT_EMAIL, // ⚠️ MUST be verified in Brevo
      },
      to: [
        {
          email: process.env.CLIENT_EMAIL,
        },
      ],
      subject: `New Inquiry - ${name}`,
      htmlContent: `
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

    console.log("✅ Email sent successfully");

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("❌ Brevo Error:", error.response?.body || error.message);

    return res.status(500).json({
      success: false,
      message: "Email failed",
    });
  }
});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});