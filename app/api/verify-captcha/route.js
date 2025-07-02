export async function POST(req) {
  const { token } = await req.json();

  try {
    const params = new URLSearchParams();
    params.append("secret", process.env.NEXT_RECAPTCHA_SECRET_KEY);
    params.append("response", token);

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await res.json();
    console.log("🔍 reCAPTCHA verify result:", data); // Add this temporarily for logging

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("❌ reCAPTCHA verification failed:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Verification error" }),
      { status: 500 }
    );
  }
}

