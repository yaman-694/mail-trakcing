import express from "express";
import connectDB from "./connect.js";
import MailTracking from "./model/mail-tracking.js";
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

connectDB(process.env.MONGODB_URI || "mongodb://localhost:27017/mail-tracking");

// Basic route
app.get("/", (req, res) => {
  res.send("Express server is running!");
});

// Mail tracking endpoint (tracking pixel)
app.get("/track", async (req, res) => {
  // Log tracking event (can be extended to store in DB)
  const { emailId } = req.query;
  console.log(`Mail opened. Email ID: ${emailId || "unknown"}`);

  // 1x1 transparent GIF
  const pixel = Buffer.from(
    "R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
    "base64"
  );

  await MailTracking.create({
    emailId: emailId || "unknown",
    openedAt: new Date(),
    userAgent: req.headers["user-agent"],
  });

  res.set("Content-Type", "image/gif");
  res.set("Cache-Control", "no-cache, no-store, must-revalidate");
  res.send(pixel);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
