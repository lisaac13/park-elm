"use client";
import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";

const GatedSection = styled.section`
	width: 100%;
	position: fixed;
	height: 100%;
	display: block;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0px;
	z-index: 9998;
	background: var(--pearl);
`;

const GatedForm = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100%;
	max-width: 800px;
	padding: 0 4rem;
	transform: translate(-50%, -50%);
	z-index: 9999;

    & .ParkElmLogo {
		width: 100%;
		max-width: 300px;
		height: auto;
		margin: auto;
		display: block;
		text-align: center;
        filter: invert(1);
	}

	& h2 {
		color: var(--rose);
        font-size: var(--form-heading);
		margin: auto;
		text-align: center;
		width: 100%;
		padding: 2rem 0;
		font-weight: 400;
		font-family: var(--font-serif-medium);
	}
    & button {
		-webkit-appearance: none;
		appearance: none;
		background: var(--rose);
		color: var(--pearl);
		font-family: var(--font-sans-serif);
		font-size: var(--body);
		letter-spacing: 0.1rem;
		font-weight: 400;
		text-transform: uppercase;
		width: fit-content;
		width: -webkit-fit-content;
		margin: auto;
		display: block;
        cursor: pointer;
		text-align: center;
        transition: 0.3s ease all;
		padding: 1rem 1rem;
        border: 1px solid var(--rose);
	}
    & button:hover {
        color: var(--rose);
        background: var(--sky);
    }
    @media only screen and (max-width: 600px) {
		& {
			padding: 0 2rem;
		}
	}
`;

const GatedFormInner = styled.form`
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: space-between;
    flex-wrap: wrap;

	& input {
		background: transparent;
		border: 1px solid var(--rose);
		border-radius: 0;
		-webkit-border-radius: 0;
		padding: 1rem;
		width: 100%;
		margin-bottom: 0rem;
		color: var(--avenue);
        text-transform: uppercase;
		font-family: var(--font-sans-serif);
		font-size: var(--body);
        letter-spacing: 0.1rem;
	}
    & input.half {
        width: calc(50% - 1rem);
    }
    & input.full {
        width: 100%;
    }

	& input#p-source {
		display: none;
	}
    & ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: var(--avenue);
    }
    & ::-moz-placeholder { /* Firefox 19+ */
    color: var(--avenue);
    }
    & :-ms-input-placeholder { /* IE 10+ */
    color: var(--avenue);
    }
    & :-moz-placeholder { /* Firefox 18- */
        color: var(--avenue);
    }
`;

export const GatedContentQueryFragment = `
    ... on Page_Flexiblecontent_Sections_GatedContent {
        fieldGroupName
        hideComponent
        heading
        subheading
        subjectLine
    }
`;

export default function GatedContent(props) {
	const { heading } = props;

    
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [source, setSource] = useState(heading);
	const [password, setPassword] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);

	const [_, setStatus] = useState({
		submitted: false,
		submitting: false,
		info: { error: false, msg: null },
	});

	useEffect(() => {
		if (localStorage.getItem("loggedin") === "true") {
			setLoggedIn(true);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password.trim().toLowerCase() === "parkelm") {
			setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
			const res = await fetch(
				"https://hooks.zapier.com/hooks/catch/2001353/3sno30w/",
				{
					method: "POST",
					body: JSON.stringify({
						firstName,
						lastName,
						email,
						phone,
						source,
					}),
				}
			);
			handleResponse(res.status);
		}
	};

	const handleResponse = async (status, msg) => {
		if (status === 200) {
			setLoggedIn(true);
			localStorage.setItem("loggedin", true);
		}
		// need to add catch for error
	};

	return !loggedIn ? (
		<GatedSection>
			<GatedForm>
				<Image
					src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/PE_LogoIcon_GLD_white.svg"
					alt="park elm logo"
					className="ParkElmLogo"
					width={350}
					height={100}
				/>

				{heading && <h2>{heading}</h2>}
				<GatedFormInner
					name="access-form"
					id="access-form"
					method="POST">
					<input
						type="hidden"
						name="form-name"
						value="access-form">
                    </input>
					<input
						id="p-firstName"
						type="text"
						name="firstName"
						value={firstName}
						placeholder="First Name *"
                        className="half"
						onChange={(e) => setFirstName(e.target.value)}
						equired
					/>
					<input
						id="p-lastName"
						type="text"
						name="lastName"
						value={lastName}
						placeholder="Last Name *"
                        className="half"
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
					<input
						id="p-email"
						type="email"
						name="email"
						value={email}
						placeholder="Email *"
                        className="half"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						id="p-phone"
						type="phone"
						name="phone"
						value={phone}
						placeholder="Phone"
                        className="half"
						onChange={(e) => setPhone(e.target.value)}
					/>
					<input
						type="password"
						name="password"
						placeholder="Enter Password*"
                        className="full"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<input
						id="p-source"
						type="source"
						name="source"
						value={heading}
					/>
					<br />
				</GatedFormInner>
				<button
					disabled={
						(firstName.length > 1 &&
							lastName.length > 1 &&
							email.length > 1 &&
							phone.length > 1 &&
							source.length > 1) ||
						password == "parkelm"
							? false
							: true
					}
					onClick={(e) => handleSubmit(e)}
					className="LoginButton"
					style={{ width: "250px", padding: "1rem" }}>
					Log In
				</button>
			</GatedForm>
		</GatedSection>
	) : null;
}