"use client";
import prase from "html-react-parser";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styled from "styled-components";

import { useSearchParams } from "next/navigation";
import { verifyCaptcha } from "../utils/verifyCaptcha";

// (Styled components code remains unchanged – omitted here for brevity)

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
	const [verifyToken, setVerifyToken] = useState(false);
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

		const verified = await verifyCaptcha(verifyToken);

		if (verified.success !== true) {
			alert("Please verify that you are not a robot.");
			return;
		}

		// ✅ Include reCAPTCHA token with the form data
		const finalForm = {
			...formState,
			token: verifyToken,
		};

		const res = await fetch(
			"https://hooks.zapier.com/hooks/catch/2001353/3s3a7jh/",
			{
				method: "POST",
				body: JSON.stringify(finalForm),
			}
		);

		const resNew = await fetch(
			"https://hooks.zapier.com/hooks/catch/16106562/3z3axds/",
			{
				method: "POST",
				body: JSON.stringify(finalForm),
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
					<FieldGroup>
						<StyledLabel htmlFor="firstName">
							First Name <span>*</span>
						</StyledLabel>
						<StyledInput
							id="firstName"
							type="text"
							name="firstName"
							placeholder="First Name"
							onChange={handleChange}
							required
						/>
					</FieldGroup>
					<FieldGroup>
						<StyledLabel htmlFor="lastName">
							Last Name <span>*</span>
						</StyledLabel>
						<StyledInput
							id="lastName"
							type="text"
							name="lastName"
							onChange={handleChange}
							placeholder="Last Name"
							required
						/>
					</FieldGroup>
					<FieldGroup>
						<StyledLabel htmlFor="email">
							Email <span>*</span>
						</StyledLabel>
						<StyledInput
							id="email"
							type="email"
							name="email"
							onChange={handleChange}
							placeholder="johndoe@email.com"
							required
						/>
					</FieldGroup>
					<FieldGroup>
						<StyledLabel htmlFor="phone">
							Phone Number <span>*</span>
						</StyledLabel>
						<StyledInput
							id="phone"
							type="text"
							name="phone"
							onChange={handleChange}
							placeholder="### ### ####"
							required
						/>
					</FieldGroup>
					<FieldGroup>
						<StyledLabel htmlFor="desiredPricing">
							Desired Pricing <span>*</span>
						</StyledLabel>
						<StyledSelect
							id="desiredPricing"
							name="desiredPricing"
							onChange={handleChange}
							required>
							<option value="">Select Desired Pricing</option>
							<option value="One Bedrooms">
								One bedrooms from $1.8M
							</option>
							<option value="Two Bedrooms">
								Two bedrooms from $2.9M
							</option>
							<option value="Three Bedrooms">
								Three bedrooms from $7.7M
							</option>
							<option value="Penthouses">
								Penthouses (pricing upon request)
							</option>
						</StyledSelect>
					</FieldGroup>
					<FieldGroup>
						<StyledLabel>
							Are You a Broker?
							<span>*</span>
						</StyledLabel>
						<MainRadioContainer>
							<RadioContainer>
								<RadioField
									id="broker"
									type="radio"
									name="broker"
									value="yes"
								/>
								<StyledRadioLabel htmlFor="broker">
									Yes
								</StyledRadioLabel>
							</RadioContainer>
							<RadioContainer>
								<RadioField
									id="notbroker"
									type="radio"
									name="broker"
									value="no"
								/>
								<StyledRadioLabel htmlFor="notbroker">
									No
								</StyledRadioLabel>
							</RadioContainer>
						</MainRadioContainer>
					</FieldGroup>
					<FieldGroup $span="2">
						<StyledLabel htmlFor="message">
							Your Inquiry <span>*</span>
						</StyledLabel>
						<StyledTextArea
							id="message"
							name="message"
							required
							onChange={handleChange}
							placeholder="Write Message Here"
						/>
					</FieldGroup>

					<ReCAPTCHA
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
						onChange={(token) => {
							console.log("✅ reCAPTCHA token received:", token);
							setVerifyToken(token);
						}}
					/>
					<SubmitButton type="submit" name="submit" value="Submit" />
				</Form>
			</FormContainer>
		</FormSection>
	);
}
