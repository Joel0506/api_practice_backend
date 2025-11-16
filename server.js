import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();

// ✅ CORS configuration
app.use(cors({
  origin: [
    "https://joel0506.github.io", // Production frontend
    "http://localhost:5500"       // Local development
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

let storedOtp = null;

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ✅ Generate OTP
app.post("/api/generate-otp", (req, res) => {
  storedOtp = generateOTP();
  console.log("Generated OTP:", storedOtp);
  res.json({ success: true, otp: storedOtp, message: "OTP generated successfully" });
});

// ✅ Verify OTP
app.post("/api/verify-otp", (req, res) => {
  const { userOtp } = req.body;

  if (userOtp === storedOtp) {
    return res.json({ success: true, message: "OTP verified successfully!" });
  }

  res.status(400).json({ success: false, message: "Invalid OTP" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
