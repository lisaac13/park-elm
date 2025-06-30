'use client';

import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Forms() {
  const recaptchaRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Execute invisible reCAPTCHA and get token
    const token = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();

    // 2. Send token to backend route
    const res = await fetch('/verify-captcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    // 3. Process response
    const data = await res.json();
    console.log('🔍 Final reCAPTCHA result:', data);

    if (data.success) {
      alert('✅ reCAPTCHA verification passed. You may proceed.');
    } else {
      alert('❌ reCAPTCHA verification failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Invisible reCAPTCHA v2 */}
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        size="invisible"
        ref={recaptchaRef}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
