"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import Logo from "/public/next.svg";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const HeaderContainer = styled.header`
	&.sitebranding {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		padding: 1.5rem 4rem;
	}

	&.sitebranding.sticky {
		background: var(--sky);
		align-items: center;
		padding: 0.5rem 4rem;
	}

	@media only screen and (max-width: 700px) {
		&.sitebranding {
			padding: 1.5rem 2rem;
		}
		&.sitebranding.sticky {
			padding: 0.5rem 2rem;
		}
	}

	@media only screen and (max-width: 700px) {
		&.sitebranding {
			padding: 1.5rem 2rem;
		}
		&.sitebranding.sticky {
			padding: 0.5rem 2rem;
		}
	}
	@media only screen and (max-width: 500px) {
		&.sitebranding {
			padding: 1.5rem 1rem;
		}
		&.sitebranding.sticky {
			padding: 0.5rem 1rem;
		}
	}

`;

const ImageContainer = styled.div`
	width: 30%;
	position: relative;
	text-align: center;
	margin: 0 auto;

	& a,
	& a:visited,
	& a:focus {
		text-decoration: none;
	}

	.sitebranding.sticky & a .parkElmLogo,
	.sitebranding & a .parkElmIcon {
		display: none;
	}

	.sitebranding & a .parkElmLogo,
	.sitebranding.sticky & a .parkElmIcon {
		display: block;
	}

	.sitebranding & a .parkElmLogo {
		position: relative;
		width: 100%;
		margin: auto;
		text-align: center;
		max-width: 350px;
		height: auto;
	}

	.sitebranding.sticky & a .parkElmIcon {
		position: relative;
		width: 100%;
		text-align: center;
		margin: auto;
		max-width: 24px;
		height: auto;
	}

	@media only screen and (max-width: 1680px) {
		.sitebranding & a .parkElmLogo {
			max-width: 300px;
		}
	}
	@media only screen and (max-width: 600px) {
		.sitebranding & a .parkElmLogo {
			max-width: 150px;
		}
	}
`;

const LeftNavigation = styled.div`
	width: 35%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-start;

	.sitebranding & a,
	.sitebranding & a:visited,
	.sitebranding & a:focus {
		color: var(--pearl);
		text-decoration: none;
		font-weight: 400;
		font-family: var(--font-sans-serif);
		letter-spacing: 0.1rem;
	}

	.sitebranding.sticky & a {
		color: var(--rose);
	}

	.sitebranding & .telNumber,
	.sitebranding.sticky & .telNumber {
		display: block;
	}
	.sitebranding & .telIconWhite,
	.sitebranding.sticky & .telIconWhite,
	.sitebranding & .telIconGold,
	.sitebranding.sticky & .telIconGold {
		display: none;
	}

	@media only screen and (max-width: 700px) {
		.sitebranding & a.telNumber,
		.sitebranding.sticky & .telNumber {display: none;}

		.sitebranding & .telIconWhite,
		.sitebranding.sticky & .telIconGold {
			display: block;
		}
	}
`;
const RightNavigation = styled.div`
	width: 35%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	.sitebranding & a,
	.sitebranding & a:visited,
	.sitebranding & a:focus {
		color: var(--pearl);
		text-decoration: none;
		text-transform: uppercase;
		font-weight: 400;
		font-family: var(--font-sans-serif);
		letter-spacing: 0.1rem;
	}

	.sitebranding.sticky & a {
		color: var(--rose);
	}
`;

export default function Header() {
	useEffect(() => {
		ScrollTrigger.create({
			start: "top 0",
			end: 99999,
			toggleClass: { className: "sticky", targets: ".sitebranding" },
		});
	}, []);

	return (
		<HeaderContainer className="sitebranding">
			<LeftNavigation>
				<Link href="tel:+13102464777" className="telNumber">310.246.4777</Link>
				<Link href="tel:+13102464777" className="telIconWhite">
					<Image 
					src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/ic_baseline-phone.svg"
					alt="telephone icon"
					width={24}
					height={24}/>
				</Link>
				<Link href="tel:+13102464777" className="telIconGold">
					<Image 
					src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/ic_baseline-phone-1.svg"
					alt="telephone icon"
					width={24}
					height={24}/>
				</Link>
			</LeftNavigation>

			<ImageContainer>
				<Link href="/">
				<Image 
				className="parkElmLogo"
				src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/PE_Logo_white.svg" 
				width={223}
				height={73}
				alt="Park Elm at Century Plaza" />

				<Image 
				className="parkElmIcon"
				src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/PE_Icon_GLD.svg" 
				width={24}
				height={27}
				alt="Park Elm at Century Plaza Palm Tree Icon" />
				</Link>
			</ImageContainer>

			<RightNavigation>
				<Link href="/#inquire">Inquire</Link>
			</RightNavigation>
		</HeaderContainer>
	);
}
