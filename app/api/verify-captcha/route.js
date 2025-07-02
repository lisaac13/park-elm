export async function POST(req) {
  const { token } = await req.json();
 
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.NEXT_RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
 
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Verification error" }),
      { status: 500 }
    );
  }
}
