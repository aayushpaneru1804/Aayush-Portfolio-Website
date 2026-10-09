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

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured.");
      return Response.json(
        { error: "The contact service is not configured yet. Please try again later." },
        { status: 503 }
      );
    }

    const safeTopic = topic.replace(/[\r\n]/g, " ").slice(0, 120) || "General Inquiry";
    const safeName = name.replace(/[\r\n]/g, " ").slice(0, 120);
    const emailText = [
      `Name: ${safeName}`,
      `Email: ${email}`,
      `Topic: ${safeTopic}`,
      "",
      message,
    ].join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ||
          "Aayush Paneru Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL || "imaayushpaneru@gmail.com"],
        reply_to: email,
        subject: `[Portfolio Inquiry] ${safeTopic}`,
        text: emailText,
      }),
    });

    const resendBody = await resendResponse.json().catch(() => null);

    if (!resendResponse.ok) {
      console.error("Resend rejected contact form email:", {
        status: resendResponse.status,
        body: resendBody,
      });
      return Response.json(
        { error: "Your message could not be sent. Please try again later." },
        { status: 502 }
      );
    }

    return Response.json({
      message: "Message sent successfully.",
      id: resendBody?.id,
    });
  } catch (error) {
    console.error("Contact form submission failed:", {
      message: error instanceof Error ? error.message : String(error),
    });
    return Response.json(
      { error: "Your message could not be sent. Please try again later." },
      { status: 500 }
    );
  }
}
