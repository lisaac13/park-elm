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
		justify-content: space-between;
		align-items: center;
	}

	&.sitebranding.sticky {
		background: var(--sky);
	}
`;

const ImageContainer = styled.div`
	.sitebranding.sticky & .parkElmLogo,
	.sitebranding & .parkElmIcon {
		display: none;
	}

	.sitebranding & .parkElmLogo,
	.sitebranding.sticky & .parkElmIcon {
		display: block;
	}

	.sitebranding & .parkElmLogo {
		position: relative;
		max-width: 223px;
	}

	.sitebranding.sticky & .parkElmIcon {
		position: relative;
		max-width: 24px;
	}
`;

const LeftNavigation = styled.div`
	.sitebranding & a,
	.sitebranding & a:visited,
	.sitebranding & a:focus {
		color: var(--pearl);
		text-decoration: none;
		padding: 0 0rem 0 2rem;
	}

	.sitebranding.sticky & a {
		color: var(--black);
	}
`;
const RightNavigation = styled.div`
	.sitebranding & a,
	.sitebranding & a:visited,
	.sitebranding & a:focus {
		color: var(--pearl);
		text-decoration: none;
		padding: 0 2rem 0 0rem;
		text-transform: uppercase;
	}

	.sitebranding.sticky & a {
		color: var(--black);
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
				<Link href="/">### ### ####</Link>
			</LeftNavigation>

			<ImageContainer>
				<Image 
				className="parkElmLogo"
				src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/PE_Logo_white.svg" 
				width={223}
				height={73}
				alt="Park Elm at Century Plaza" />

				<Image 
				className="parkElmIcon"
				src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/PE_Logo_white.svg" 
				width={24}
				height={27}
				alt="Park Elm at Century Plaza Palm Tree Icon" />
			</ImageContainer>

			<RightNavigation>
				<Link href="/">Inquire</Link>
			</RightNavigation>
		</HeaderContainer>
	);
}
