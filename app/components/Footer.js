"use client";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const StyledFooter = styled.footer`
	width: 100%;
	background: var(--rose);
`;

const InnerContainer = styled.div`
	width: 100%;
	padding: 4rem 4rem;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 2rem;
`;

const ImageContainer = styled.div`
	max-width: 209px;
	position: relative;

	& img{
		width: 100%;
		max-width: 100%;
		height: auto;
	}
`;
const Address = styled.div`
	& address {
		font-family: var(--font-serif-med-italic);
		color: var(--pearl);
		font-size: var(--address);
	}
`;

const FooterLinks = styled.ul`
	list-style: none;

	& li {
		font-family: var(--font-sans-serif);
		font-size: var(--cta);
		color: var(--pearl);
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
	}
`;

const FooterLinksTwo = styled.ul`
	list-style: none;

	& li {
		font-family: var(--font-sans-serif);
		font-size: var(--cta);
		color: var(--pearl);
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		opacity: 0.7;
	}
`;

const SocialContainer = styled.div``;

export default function Footer() {
	return (
		<StyledFooter>
			<InnerContainer>
			<ImageContainer>
				<Image 
				src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/PE_LogoIcon_GLD_white.svg"
				width={209}
				height={118}
				alt="Park Elm at Century Park Logo with Palm Icon"/>
			</ImageContainer>
			<Address>
				<address>2025 Avenue of the Stars<br/>Los Angeles, CA 90067</address>
			</Address>
			<FooterLinks>
				<li>Residences</li>
				<li>Services & Amenities</li>
				<li>Century Plaza</li>
				<li>Neighborhood</li>
				<li>Team</li>
			</FooterLinks>
			<FooterLinksTwo>
				<li>Privacy Policy</li>
				<li>Cookie Policy</li>
				<li>Accessibility</li>
				<li>Disclaimer</li>
			</FooterLinksTwo>

			<SocialContainer>
				<Link target="_blank" href="https://www.instagram.com/parkelmcenturyplaza/">
					<Image 
						src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/instagram.svg"
						alt="instagram icon"
						width={24}
						height={24}/>
				</Link>
			</SocialContainer>
			</InnerContainer>
		</StyledFooter>
	);
}
