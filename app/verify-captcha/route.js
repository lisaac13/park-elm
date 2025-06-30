export async function POST(req) {
  const body = await req.json();
  const token = body.token;

  console.log("📥 Received token from frontend:", token);

  const secret = process.env.NEXT_RECAPTCHA_SECRET_KEY;

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=${secret}&response=${token}`,
  });

  const data = await response.json();
  console.log("🔒 reCAPTCHA verification result:", data);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
