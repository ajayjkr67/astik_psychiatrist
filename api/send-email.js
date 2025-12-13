// import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

const { first_name, last_name, email, user_phone, message } = req.body;
const name = `${first_name} ${last_name || ""}`.trim();


  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { email: "kitsaenam@gmail.com" },
        to: [{ email: "kitsaenam@gmail.com" }],
        replyTo: { email },
        subject: "New Website Enquiry",
        htmlContent: `
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Phone: ${user_phone}</p>
          <p>Message: ${message}</p>
        `,
      }),
    });

    if (!response.ok) throw new Error("Brevo failed");

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
}
