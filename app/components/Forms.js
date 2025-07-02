"use client";
import prase from "html-react-parser";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";
import { verifyCaptcha } from "../utils/verifyCaptcha";
const FormSection = styled.section`
	background-color: var(--sky);
	padding: 6rem 0;
`;
const ContentContainer = styled.div`
	max-width: 765px;
	width: 100%;
	display: flex;
	flex-direction: row;
	gap: 2.25rem;
	margin-bottom: 3rem;
	margin-inline: auto;
> div {
		display: flex;
		flex-direction: column;
	}
	@media screen and (max-width: 820px) {
		flex-direction: column;
		text-align: center;
		padding-inline: 2rem;
		img {
			margin: 0 auto;
		}
	}
`;
const Title = styled.h2`
	font-size: var(--heading);
	color: var(--rose);
	font-family: var(--font-serif-medium);
	font-weight: 400;
& span {
		font-family: var(--font-serif-med-italic);
	}
`;
const Content = styled.p`
	font-family: var(--font-sans-serif);
	color: var(--rose);
`;
const FormContainer = styled.div`
	max-width: 765px;
	width: 100%;
	margin: 0 auto;
`;
const Form = styled.form`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1.25rem;
	row-gap: 2rem;
	@media screen and (max-width: 820px) {
		grid-template-columns: 1fr;
		padding-inline: 2rem;
	}
`;
const FieldGroup = styled.div`
	display: flex;
	flex-direction: ${(props) => props.$fdisplay || "column"};
	grid-column: ${(props) => (props.$span === "2" ? "span 2" : "auto")};
	@media screen and (max-width: 820px) {
		grid-column: auto;
	}
`;
const StyledLabel = styled.label`
	font-family: var(--font-serif-med-italic);
	color: var(--rose);
	font-size: var(--form-heading);
	span {
		color: white;
	}
`;
const StyledInput = styled.input`
	background-color: transparent;
	-webkit-appearance: none;
	border: 0;
	border-bottom: 1.5px solid var(--pearl);
	padding: 0.9rem 0.9rem 0.9rem 0;
	color: var(--avenue);
	text-transform: uppercase;
	font-size: 0.75rem;
	font-family: var(--font-sans-serif);
	letter-spacing: 0.25rem;
	border-radius: 0;
&::placeholder {
		color: var(--avenue);
	}
`;
const StyledRadioLabel = styled.label`
	color: var(--avenue);
	text-transform: uppercase;
	font-size: 0.75rem;
	font-family: var(--font-sans-serif);
	letter-spacing: 0.25rem;
	padding-left: 1.25rem;
`;
const MainRadioContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 1rem;
`;
const RadioContainer = styled.div`
	width: 25%;
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const RadioField = styled.input`
	accent-color: var(--rose);
`;
const StyledSelect = styled.select`
	background-color: transparent;
	-webkit-appearance: none;
	border: 0;
	border-bottom: 1.5px solid var(--pearl);
	padding: 0.9rem 0.9rem 0.9rem 0;
	color: var(--avenue);
	text-transform: uppercase;
	font-size: 0.75rem;
	font-family: var(--font-sans-serif);
&::placeholder {
		color: var(--avenue);
	}
`;
const StyledTextArea = styled.textarea`
	background-color: transparent;
	-webkit-appearance: none;
	border: 0;
	border-bottom: 1.5px solid var(--pearl);
	padding: 0.9rem 0.9rem 0.9rem 0;
	color: var(--avenue);
	text-transform: uppercase;
	font-size: 0.75rem;
	font-family: var(--font-sans-serif);
&::placeholder {
		color: var(--avenue);
	}
`;
const SubmitButton = styled.input`
	width: fit-content;
	width: -webkit-fit-content;
	max-height: 74px;
	font-size: clamp(1rem, 1.2vh, 1.4rem);
	background-color: transparent;
	border: 1px solid var(--rose);
	padding: 1rem 2rem;
	cursor: pointer;
	letter-spacing: 0.1rem;
	color: var(--avenue);
	font-size: var(--body);
	text-transform: uppercase;
	font-family: var(--font-sans-serif);
	font-weight: 400;
	font-style: normal;
	transition: 0.3s ease all;
	margin-left: auto;
	grid-column: 2/3;
	@media screen and (max-width: 820px) {
		grid-column: auto;
	}
&:hover {
		background-color: var(--white);
		color: #000000;
		border: 1px solid var(--black);
	}
`;
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
							type="text"
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
							placeholder="Write Message Here"></StyledTextArea>
</FieldGroup>
<ReCAPTCHA
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
						onChange={setVerifyToken}
					/>
<SubmitButton type="submit" name="submit" value="Submit" />
</Form>
</FormContainer>
</FormSection>
	);
}
