"use client";
import prase from "html-react-parser";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Script from "next/script";
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

const SubmitButton = styled.button`
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
	const [verifyToken, setVerifyToken] = useState(""); // ✅ was `false`
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

	// const handleChange = (e) => {
	// 	e.preventDefault();
	// 	setFormState({
	// 		...formState,
	// 		[e.target.name]: e.target.value,
	// 		date: new Date().toLocaleString(),
	// 	});
	// };

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

		// const resNew = await fetch(
		// 	"https://hooks.zapier.com/hooks/catch/16106562/3z3axds/",
		// 	{
		// 		method: "POST",
		// 		body: JSON.stringify(formState),
		// 	}
		// );

		handleResponse(res);
	};

	const handleResponse = async (res) => {
		if (res.status === 200) setSuccess(true);
		window.location.href = "/thank-you";
	};

	// rewrite the script above into a useEffect hook
	useEffect(() => {
		const form = document.getElementById("spark-registration-form");
		const siteKey = process.env.NEXT_RECAPTCHA_NEW_SITE_KEY;

		// Hide spam trap
		document.getElementById("are_you_simulated").style.display = "none";

		form.addEventListener("submit", (e) => {
			e.preventDefault();

			let missing = "";
			const requiredFields = document.querySelectorAll(
				"input:required, textarea:required, select:required"
			);

			requiredFields.forEach((field) => {
				if (!field.value.trim()) {
					missing += `- ${
						field.placeholder || field.name
					} is required\n`;
				}
			});

			// Validate email format
			const email = document.getElementById("contact_email").value.trim();
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (email && !emailRegex.test(email)) {
				missing += "- Email is invalid\n";
			}

			if (missing !== "") {
				alert("Please correct the following:\n" + missing);
				return;
			}

			// Disable the button to prevent duplicate submissions
			const button = document.getElementById("gform_submit_button_1");
			button.disabled = true;

			grecaptcha.ready(function () {
				grecaptcha
					.execute(siteKey, { action: "registration" })
					.then(function (token) {
						document.getElementById("g-recaptcha-response").value =
							token;
						form.submit();
					});
			});

			// Re-enable button after 3 seconds in case something fails
			setTimeout(() => {
				button.disabled = false;
			}, 3000);
		});
	}, []);

	// write useeffect hook to handle setting of the utm inputs fields to their respective values from the searchParams
	useEffect(() => {
		const utmFields = {
			utm_source: searchParams.get("utm_source") || "",
			utm_medium: searchParams.get("utm_medium") || "",
			utm_campaign: searchParams.get("utm_campaign") || "",
			utm_term: searchParams.get("utm_term") || "",
			utm_content: searchParams.get("utm_content") || "",
		};

		Object.keys(utmFields).forEach((key) => {
			// find the correct field by the data-type attribute
			const field = document.querySelector(`input[data-type="${key}"]`);
			if (field) {
				field.value = utmFields[key];
			}
			// Log the setting of the field for debugging
			// This can be removed in production
			console.log("Setting field:", key, "to value:", utmFields[key]);
		});
	}, [searchParams]);

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
					<Content style={{ marginTop: "1rem" }}>
						* indicates a required field
					</Content>
				</div>
			</ContentContainer>

			<Script
				src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_RECAPTCHA_NEW_SITE_KEY}`}
			/>

			<FormContainer>
				{/* <Form onSubmit={handleSubmit}>
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
							placeholder="Last Name"
							onChange={handleChange}
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
							placeholder="johndoe@email.com"
							onChange={handleChange}
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
							placeholder="### ### ####"
							onChange={handleChange}
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
							Are You a Broker?<span>*</span>
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
							onChange={handleChange}
							placeholder="Write Message Here"
							required
						/>
					</FieldGroup>

					<ReCAPTCHA
						sitekey={process.env.NEXT_RECAPTCHA_SITE_KEY}
						onChange={(token) => {
							console.log("✅ reCAPTCHA token:", token);
							setVerifyToken(token);
						}}
					/>

					<SubmitButton type="submit" name="submit" value="Submit" />
				</Form> */}

				<Form
					id="spark-registration-form"
					action="https://spark.re/douglas-elliman-development-marketing/park-elm/register/registration-form"
					acceptCharset="UTF-8"
					method="post">
					{/* Hidden fields for UTM parameters */}
					<div
						style={{
							visibility: "hidden",
							height: 0,
							overflow: "hidden",
							position: "absolute",
						}}>
						<table className="responsive-table filterer resize-table">
							<tbody>
								<tr>
									<td>
										<table width="100%">
											<tbody>
												<tr>
													<td className="custom-field-widget">
														<div>
															<label className="label-text">
																GCLID
															</label>
															<input
																maxLength="1000"
																data-type="gclid"
																data-other-options="false"
																type="text"
																id="contact[custom_fields_attributes][21455]_21455"
																name="contact[custom_fields_attributes][21455][value]"
															/>
															<input
																type="hidden"
																name="contact[custom_fields_attributes][21455][template_id]"
																value="21455"
															/>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>

						<table className="responsive-table filterer resize-table">
							<tbody>
								<tr>
									<td>
										<table width="100%">
											<tbody>
												<tr>
													<td className="custom-field-widget">
														<div>
															<label className="label-text">
																utm_source
															</label>
															<input
																maxLength="1000"
																className=""
																data-type="utm_source"
																data-other-options="false"
																type="text"
																id="contact[custom_fields_attributes][21450]_21450"
																name="contact[custom_fields_attributes][21450][value]"
															/>
															<input
																type="hidden"
																name="contact[custom_fields_attributes][21450][template_id]"
																value="21450"
															/>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>

						<table className="responsive-table filterer resize-table">
							<tbody>
								<tr>
									<td>
										<table width="100%">
											<tbody>
												<tr>
													<td className="custom-field-widget">
														<div>
															<label className="label-text">
																utm_campaign
															</label>
															<input
																maxLength="1000"
																className=""
																data-type="utm_campaign"
																data-other-options="false"
																type="text"
																id="contact[custom_fields_attributes][21452]_21452"
																name="contact[custom_fields_attributes][21452][value]"
															/>
															<input
																type="hidden"
																name="contact[custom_fields_attributes][21452][template_id]"
																value="21452"
															/>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>

						<table className="responsive-table filterer resize-table">
							<tbody>
								<tr>
									<td>
										<table width="100%">
											<tbody>
												<tr>
													<td className="custom-field-widget">
														<div>
															<label className="label-text">
																utm_medium
															</label>
															<input
																maxLength="1000"
																className=""
																data-type="utm_medium"
																data-other-options="false"
																type="text"
																id="contact[custom_fields_attributes][21451]_21451"
																name="contact[custom_fields_attributes][21451][value]"
															/>
															<input
																type="hidden"
																name="contact[custom_fields_attributes][21451][template_id]"
																value="21451"
															/>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>

						<table className="responsive-table filterer resize-table">
							<tbody>
								<tr>
									<td>
										<table width="100%">
											<tbody>
												<tr>
													<td className="custom-field-widget">
														<div>
															<label className="label-text">
																utm_term
															</label>
															<input
																maxLength="1000"
																className=""
																data-type="utm_term"
																data-other-options="false"
																type="text"
																id="contact[custom_fields_attributes][21453]_21453"
																name="contact[custom_fields_attributes][21453][value]"
															/>
															<input
																type="hidden"
																name="contact[custom_fields_attributes][21453][template_id]"
																value="21453"
															/>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>

						<table className="responsive-table filterer resize-table">
							<tbody>
								<tr>
									<td>
										<table width="100%">
											<tbody>
												<tr>
													<td className="custom-field-widget">
														<div>
															<label className="label-text">
																utm_content
															</label>
															<input
																maxLength="1000"
																className=""
																data-type="utm_content"
																data-other-options="false"
																type="text"
																id="contact[custom_fields_attributes][21454]_21454"
																name="contact[custom_fields_attributes][21454][value]"
															/>
															<input
																type="hidden"
																name="contact[custom_fields_attributes][21454][template_id]"
																value="21454"
															/>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<FieldGroup>
						<StyledLabel htmlFor="contact_first_name">
							First Name <span>*</span>
						</StyledLabel>
						<StyledInput
							required=""
							type="text"
							id="contact_first_name"
							name="contact[first_name]"
							placeholder="First Name *"
						/>
					</FieldGroup>

					<FieldGroup>
						<StyledLabel htmlFor="contact_last_name">
							Last Name <span>*</span>
						</StyledLabel>
						<StyledInput
							required=""
							type="text"
							id="contact_last_name"
							name="contact[last_name]"
							placeholder="Last Name *"
						/>
					</FieldGroup>

					<FieldGroup>
						<StyledLabel htmlFor="contact_phone">
							Phone <span>*</span>
						</StyledLabel>
						<StyledInput
							id="contact_phone"
							name="contact[phone]"
							required=""
							type="tel"
							placeholder="Phone *"
						/>
					</FieldGroup>

					<FieldGroup>
						<StyledLabel htmlFor="contact_email">
							Email <span>*</span>
						</StyledLabel>
						<StyledInput
							id="contact_email"
							name="contact[email]"
							required=""
							type="email"
							placeholder="Email *"
						/>
					</FieldGroup>

					<FieldGroup className="answer">
						<StyledLabel htmlFor="answers_23619">
							Desired Pricing <span>*</span>
						</StyledLabel>
						<StyledSelect
							name="answers[23619][answers]"
							id="answers_23619">
							<option value="">Desired Pricing</option>
							<option value="ONE BEDROOMS FROM $1.8M">
								ONE BEDROOMS FROM $1.8M
							</option>
							<option value="TWO BEDROOMS FROM $2.9M">
								TWO BEDROOMS FROM $2.9M
							</option>
							<option value="THREE BEDROOMS FROM $7.7M">
								THREE BEDROOMS FROM $7.7M
							</option>
							<option value="PENTHOUSES (PRICING UPON REQUEST)">
								PENTHOUSES (PRICING UPON REQUEST)
							</option>
						</StyledSelect>
					</FieldGroup>

					<FieldGroup>
						<StyledLabel htmlFor="agent">
							Are You a Broker? <span>*</span>
						</StyledLabel>
						<StyledSelect name="agent" id="agent">
							<option value="">Are You a Broker?</option>
							<option value="false">No</option>
							<option value="true">Yes</option>
						</StyledSelect>
					</FieldGroup>

					<FieldGroup $span="2">
						<StyledLabel htmlFor="contact_comments">
							Your Inquiry
						</StyledLabel>
						<StyledTextArea
							style={{ height: "96px" }}
							type="textarea"
							name="contact[comments]"
							id="contact_comments"
							placeholder="Write Your Inquiry Here"
							rows="5"
							data-enhance="false"
						/>
					</FieldGroup>

					{/* <ReCAPTCHA
						sitekey={process.env.NEXT_RECAPTCHA_SITE_KEY}
						onChange={(token) => {
							console.log("✅ reCAPTCHA token:", token);
							setVerifyToken(token);
						}}
					/> */}

					<SubmitButton
						type="submit"
						// className="gform_button button wpcf7-form-control wpcf7-submit"
						id="gform_submit_button_1">
						Submit
						{/* <svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 32 32">
							<path d="M18.4 6l-1.68 1.75 6.72 7h-19.44v2.5h19.44l-6.72 7 1.68 1.75 9.6-10-9.6-10z"></path>
						</svg> */}
					</SubmitButton>

					<input
						type="hidden"
						name="redirect_success"
						id="redirect_success"
						value="https://parkelmcenturyplaza.com/thank-you/"
					/>
					<input
						type="hidden"
						name="are_you_simulated"
						id="are_you_simulated"
						placeholder="Leave this field blank"
						style={{ display: "none" }}
					/>
					<input
						type="hidden"
						name="g-recaptcha-response"
						id="g-recaptcha-response"
						className="g-recaptcha-response"
					/>
				</Form>
			</FormContainer>
		</FormSection>
	);
}
