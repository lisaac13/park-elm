"use client";
import prase from "html-react-parser";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";
import { verifyCaptcha } from "../utils/verifyCaptcha";

// [Styled Components declarations remain unchanged]

export const FormQueryFragment = `
  ... on Page_Flexiblecontent_Sections_SingleColumnForm {
    anchor
    content
    fieldGroupName
    formToUse
    hideComponent
    title
  }
`;

export default function Forms(props) {
  const { anchor, content, title, formToUse } = props;
  const [verifyToken, setVerifyToken] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formState, setFormState] = useState({
    source: "Park Elm Landing Page",
    desiredPricing: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("utm_source")) {
      setFormState({
        ...formState,
        utm_source: searchParams.get("utm_source"),
        utm_medium: searchParams.get("utm_medium"),
        utm_campaign: searchParams.get("utm_campaign"),
        utm_term: searchParams.get("utm_term"),
        utm_content: searchParams.get("utm_content"),
      });
    }
  }, [searchParams]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      date: new Date().toLocaleString(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("▶ Submit clicked");
    console.log("▶ verifyToken:", verifyToken);

    if (!verifyToken) {
      alert("Please check the reCAPTCHA box.");
      return;
    }

    const verified = await verifyCaptcha(verifyToken);
    console.log("✅ verifyCaptcha returned:", verified);

    if (!verified || verified.success !== true) {
      alert("Please verify that you are not a robot.");
      return;
    }

    console.log("🚀 CAPTCHA verified! Submitting form...");

    const res = await fetch(
      "https://hooks.zapier.com/hooks/catch/2001353/3s3a7jh/",
      {
        method: "POST",
        body: JSON.stringify(formState),
      }
    );

    const resNew = await fetch(
      "https://hooks.zapier.com/hooks/catch/16106562/3z3axds/",
      {
        method: "POST",
        body: JSON.stringify(formState),
      }
    );

    handleResponse(res);
  };

  const handleResponse = async (res) => {
    if (res.status === 200) setSuccess(true);
    window.location.href = "/thank-you";
  };

  return (
    <FormSection>
      {anchor && <a id={anchor} className="anchor"></a>}
      <ContentContainer>
        <Image
          src="https://cms.parkelmcenturyplaza.com/wp-content/uploads/2023/10/PE_Icon_GLD.svg"
          width="42"
          height="66"
          alt="Park Elm Logo"
        />
        <div>
          <Title>{prase(title)}</Title>
          <Content>{content}</Content>
        </div>
      </ContentContainer>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          {/* All input fields here... */}

          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={(token) => {
              console.log("🧠 reCAPTCHA solved:", token);
              setVerifyToken(token);
            }}
          />

          <SubmitButton type="submit" name="submit" value="Submit" />
        </Form>
      </FormContainer>
    </FormSection>
  );
}
