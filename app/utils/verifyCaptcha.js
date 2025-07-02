export const verifyCaptcha = async (token) => {
  const res = await fetch("/api/verify-captcha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  return await res.json(); // { success: true } expected
};

