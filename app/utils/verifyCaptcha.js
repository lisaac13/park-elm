"use server";

export const verifyCaptcha = async (verifyToken) => {
  console.log("🔍 Token received for verification:", verifyToken); // <-- Add this
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: `secret=${process.env.NEXT_RECAPTCHA_SECRET_KEY}&response=${verifyToken}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await res.json();
  console.log("📩 reCAPTCHA verification result:", data); // <-- Add this
  return data;
};
