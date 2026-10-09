import nodemailer from "nodemailer";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const topic = String(body.topic || "General Inquiry").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message || !emailPattern.test(email)) {
      return Response.json(
        { error: "Please provide your name, a valid email address, and a message." },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.error("Contact form email credentials are not configured.");
      return Response.json(
        { error: "The contact service is not configured yet. Please try again later." },
        { status: 503 }
      );
    }

    const safeTopic = topic.replace(/[\r\n]/g, " ").slice(0, 120) || "General Inquiry";
    const safeName = name.replace(/[\r\n]/g, " ").slice(0, 120);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: (process.env.SMTP_SECURE || "true") === "true",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `Aayush Paneru Portfolio <${smtpUser}>`,
      to: process.env.CONTACT_TO_EMAIL || "imaayushpaneru@gmail.com",
      replyTo: email,
      subject: `[Portfolio Inquiry] ${safeTopic}`,
      text: [
        `Name: ${safeName}`,
        `Email: ${email}`,
        `Topic: ${safeTopic}`,
        "",
        message,
      ].join("\n"),
    });

    return Response.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return Response.json(
      { error: "Your message could not be sent. Please try again later." },
      { status: 500 }
    );
  }
}
