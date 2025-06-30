"use client";

import React, { useState } from "react";

export default function Forms() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Execute reCAPTCHA v3
      const token = await grecaptcha.execute("6Ldd2HIrAAAAALGFeMoce7XlbWrl8Mag48gznPIh", { action: "submit" });

      // Verify token via our internal API
      const captchaRes = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const captchaData = await captchaRes.json();
      console.log("🔍 CAPTCHA verification:", captchaData);

      if (!captchaData.success) {
        setError("Captcha failed. Please refresh and try again.");
        setSubmitting(false);
        return;
      }

      // Form passed CAPTCHA, submit data (you can customize where this goes)
      const res = await fetch("/your-form-handler-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Form submission failed.");

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {success && <p className="success">Thank you! We'll be in touch.</p>}
      {error && <p className="error">{error}</p>}

      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>

      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>

      <label>
        Message:
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
