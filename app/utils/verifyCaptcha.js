"use server";

export const verifyCaptcha = async (verifyToken) => {
  console.log("📨 Token to verify:", verifyToken);

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.NEXT_RECAPTCHA_SECRET_KEY}&response=${verifyToken}`,
    });

    const data = await res.json();
    console.log("✅ reCAPTCHA verification response:", data);
    return data;
  } catch (error) {
    console.error("❌ reCAPTCHA verification failed:", error);
    return { success: false, error };
  }
};


