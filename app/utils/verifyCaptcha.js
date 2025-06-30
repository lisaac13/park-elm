"use server";

export const verifyCaptcha = async (verifyToken) => {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: process.env.NEXT_RECAPTCHA_SECRET_KEY,
      response: verifyToken,
    }).toString(),
  });

  const data = await res.json();
  return data;
};
