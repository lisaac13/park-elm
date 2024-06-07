"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import Logo from "/public/next.svg";
import Script from "next/script";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { GoogleTagManager } from "@next/third-parties/google";
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
	& .mobileInquire {display: none;}
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
	@media only screen and (max-width: 600px) {
		& .mobileInquire {
			display: block;
			width: 100%;
			margin: 0 auto;
			text-align: center;
			position: absolute;
			top: 0px;
			left: 0px;
			right: 0px;
			padding: 1rem;
			background: var(--rose);
			color: var(--pearl);
			font-weight: 400;
			font-family: var(--font-sans-serif);
			letter-spacing: 0.1rem;
			text-transform: uppercase;
		}
		&.sitebranding,
		&.sitebranding.sticky {
			padding: 4rem 1rem 1.5rem 1rem;
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

	.sitebranding & a .parkElmLogo.open,
	.sitebranding.sticky & a .parkElmIcon.open,
	.sitebranding.sticky & a .parkElmLogo,
	.sitebranding & a .parkElmIcon {
		display: none;
	}

	.sitebranding & a .parkElmLogo.open {
		padding: 0.5rem 0 0 0;
	}

	.sitebranding & a .parkElmLogo.open,
	.sitebranding.sticky & a .parkElmLogo.open,
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

	.sitebranding & a .parkElmLogo.open,
	[data-page="/floor-plans"] .sitebranding & a .parkElmLogo,
	[data-page="/park-elm-gallery"] .sitebranding & a .parkElmLogo,
	[data-page="/privacy-policy"] .sitebranding & a .parkElmLogo,
	[data-page="/gallery"] .sitebranding & a .parkElmLogo,
	[data-page="/accessibility"] .sitebranding & a .parkElmLogo {
		filter: invert(1);
	}

	.sitebranding.sticky & a .parkElmIcon {
		position: relative;
		width: 100%;
		text-align: center;
		margin: auto;
		max-width: 24px;
		display: block;
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

	[data-page="/floor-plans"] .sitebranding & a,
	[data-page="/floor-plans"] .sitebranding & a:visited,
	[data-page="/floor-plans"] .sitebranding & a:focus,
	[data-page="/park-elm-gallery"] .sitebranding & a,
	[data-page="/park-elm-gallery"] .sitebranding & a:visited,
	[data-page="/park-elm-gallery"] .sitebranding & a:focus,
	[data-page="/privacy-policy"] .sitebranding & a,
	[data-page="/privacy-policy"] .sitebranding & a:visited,
	[data-page="/privacy-policy"] .sitebranding & a:focus,
	[data-page="/gallery"] .sitebranding & a,
	[data-page="/gallery"] .sitebranding & a:visited,
	[data-page="/gallery"] .sitebranding & a:focus,
	[data-page="/accessibility"] .sitebranding & a,
	[data-page="/accessibility"] .sitebranding & a:visited,
	[data-page="/accessibility"] .sitebranding & a:focus {
		color: var(--rose);
	}

	.sitebranding.sticky & a {
		color: var(--rose);
	}

	.sitebranding & .telNumber,
	.sitebranding.sticky & .telNumber {
		display: block;
	}

	.telIconWhite.open,
	.telIconGold.open,
	.sitebranding & .telNumber.open,
	.sitebranding.sticky & .telNumber.open,
	.sitebranding & .telIconWhite,
	.sitebranding.sticky & .telIconWhite,
	.sitebranding & .telIconGold,
	.sitebranding.sticky & .telIconGold {
		display: none;
	}

	@media only screen and (max-width: 700px) {
		.sitebranding & a.telNumber,
		.sitebranding.sticky & .telNumber,
		.sitebranding & .telIconWhite.open,
		.sitebranding.sticky & .telIconGold.open,
		[data-page="/floor-plans"] .sitebranding & .telIconWhite,
		[data-page="/accessibility"] .sitebranding & .telIconWhite,
		[data-page="/gallery"] .sitebranding & .telIconWhite,
		[data-page="/privacy-policy"] .sitebranding & .telIconWhite,
		[data-page="/park-elm-gallery"] .sitebranding & .telIconWhite,
		[data-page="/floor-plans"] .sitebranding & .telIconGold.open,
		[data-page="/accessibility"] .sitebranding & .telIconGold.open,
		[data-page="/gallery"] .sitebranding & .telIconGold.open,
		[data-page="/privacy-policy"] .sitebranding & .telIconGold.open,
		[data-page="/park-elm-gallery"] .sitebranding & .telIconGold.open {
			display: none;
		}
		[data-page="/floor-plans"] .sitebranding & .telIconGold,
		[data-page="/accessibility"] .sitebranding & .telIconGold,
		[data-page="/gallery"] .sitebranding & .telIconGold,
		[data-page="/privacy-policy"] .sitebranding & .telIconGold,
		[data-page="/park-elm-gallery"] .sitebranding & .telIconGold,
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

	.sitebranding & a.open,
	.sitebranding.sticky & a.open {
		display: none;
	}

	[data-page="/floor-plans"] .sitebranding & a,
	[data-page="/floor-plans"] .sitebranding & a:visited,
	[data-page="/floor-plans"] .sitebranding & a:focus,
	[data-page="/park-elm-gallery"] .sitebranding & a,
	[data-page="/park-elm-gallery"] .sitebranding & a:visited,
	[data-page="/park-elm-gallery"] .sitebranding & a:focus,
	[data-page="/privacy-policy"] .sitebranding & a,
	[data-page="/privacy-policy"] .sitebranding & a:visited,
	[data-page="/privacy-policy"] .sitebranding & a:focus,
	[data-page="/gallery"] .sitebranding & a,
	[data-page="/gallery"] .sitebranding & a:visited,
	[data-page="/gallery"] .sitebranding & a:focus,
	[data-page="/accessibility"] .sitebranding & a,
	[data-page="/accessibility"] .sitebranding & a:visited,
	[data-page="/accessibility"] .sitebranding & a:focus {
		color: var(--rose);
	}

	.sitebranding.sticky & a {
		color: var(--rose);
	}
	@media only screen and (max-width: 600px) {
		.sitebranding & a.inquireNav {
			display: none;
		}
	}
`;

const Hamburger = styled.div`
	width: 30px;
	position: relative;
	margin-left: 2rem;
	height: auto;

	.sitebranding &.open {
		top: 1rem;
	}
	.sitebranding.sticky &.open {
		top: 0rem;
	}
	.sitebranding &.open,
	.sitebranding.sticky &.open {
		height: 30px;
	}

	& .topBar,
	& .bottomBar {
		width: 100%;
		height: 1px;
		display: block;
	}

	.sitebranding & .topBar,
	.sitebranding & .bottomBar {
		background: var(--pearl);
	}

	[data-page="/floor-plans"] .sitebranding & .topBar,
	[data-page="/floor-plans"] .sitebranding & .bottomBar,
	[data-page="/park-elm-gallery"] .sitebranding & .topBar,
	[data-page="/park-elm-gallery"] .sitebranding & .bottomBar,
	[data-page="/gallery"] .sitebranding & .topBar,
	[data-page="/gallery"] .sitebranding & .bottomBar,
	[data-page="/privacy-policy"] .sitebranding & .topBar,
	[data-page="/privacy-policy"] .sitebranding & .bottomBar,
	[data-page="/accessibility"] .sitebranding & .topBar,
	[data-page="/accessibility"] .sitebranding & .bottomBar,
	.sitebranding.sticky & .topBar,
	.sitebranding.sticky & .bottomBar {
		background: var(--rose);
	}

	& .bottomBar {
		margin: 0.7rem 0 0 0;
	}

	.sitebranding &.open .topBar {
		transform: rotate(45deg);
		left: 0;
	}

	.sitebranding &.open .bottomBar {
		right: 0;
		transform: rotate(-45deg);
		margin: 0;
	}

	.sitebranding &.open .topBar,
	.sitebranding &.open .bottomBar {
		position: absolute;
		top: 0;
		background: var(--rose);
	}
`;

const MobileContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: -1;
	width: 100%;
	display: block;
	background: var(--sky);
	height: 100vh;
	opacity: 0;
	transition: opacity 0.3s ease-in-out;

	&.open {
		z-index: 99;
		opacity: 1;
	}
`;

const MobileFlex = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	padding: 12rem 6rem 2rem 6rem;
	gap: 10rem;
	height: calc(100vh - 14rem);
	position: relative;

	@media only screen and (max-width: 820px) {
		padding: 10rem 4rem 2rem 4rem;
		gap: 0rem;
		height: calc(100vh - 12rem);
	}
`;

const Sidebar = styled.div`
	width: calc(40% - 5rem);
	height: calc(100vh - 14rem);
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	padding: 2rem 0 2rem 0;

	@media only screen and (max-width: 820px) {
		width: 100%;
	}
`;

const TopLinks = styled.ul`
	list-style: none;
	& li {
		margin-bottom: 1rem;
	}
	& li a {
		color: var(--black);
		text-decoration: none;
		text-transform: uppercase;
		font-weight: 400;
		font-family: var(--font-sans-serif);
		letter-spacing: 0.1rem;
		transition: color 0.3s ease-in-out;
	}
	& li a:hover {
		color: var(--rose);
	}
`;
const BottomLinks = styled.ul`
	list-style: none;
	& li {
		margin-bottom: 1rem;
	}
	& li address {
		color: var(--rose);
		font-size: clamp(1rem, 1vw, 2rem);
		font-family: var(--font-serif);
	}
	.mobiletel {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--rose);
		font-size: clamp(1rem, 1vw, 2rem);
		font-family: var(--font-sans-serif);
		font-weight: 400;
	}
`;

const MobileImageContainer = styled.div`
	width: calc(60% - 5rem);
	height: calc(100vh - 14rem);
	position: relative;
	background-size: cover !important;
	-moz-background-size: cover !important;
	-webkit-background-size: cover !important;
	-o-background-size: cover !important;
	background-position: center center;

	&.default {
		background-image: url("https://parkelmcms.wpenginepowered.com/wp-content/uploads/2024/01/park-elm-at-century-plaza-open-graph-image.jpg");
	}

	@media only screen and (max-width: 820px) {
		display: none;
	}
`;

export default function Header() {
	const [navIsOpen, setNavIsOpen] = useState(false);

	function toggleNav() {
		setNavIsOpen(!navIsOpen);
	}

	useEffect(() => {
		ScrollTrigger.create({
			start: "top 0",
			end: 99999,
			toggleClass: { className: "sticky", targets: ".sitebranding" },
		});
	}, []);

	return (
		<>
			<HeaderContainer className="sitebranding">
				<Script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-18FJJ5D9JD"></Script>
				<GoogleTagManager gtmId="G-SM79XXQQQX" />
					<Link
						className="mobileInquire"
						href="/#inquire">
						Inquire
					</Link>
				<LeftNavigation>
					<Link
						href="tel:+13102464777"
						className={`telNumber ${navIsOpen ? "open" : ""}`}>
						310.246.4777
					</Link>
					<Link
						href="tel:+13102464777"
						className={`telIconWhite ${navIsOpen ? "open" : ""}`}>
						<Image
							src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/ic_baseline-phone.svg"
							alt="telephone icon"
							width={24}
							height={24}
						/>
					</Link>
					<Link
						href="tel:+13102464777"
						className={`telIconGold ${navIsOpen ? "open" : ""}`}>
						<Image
							src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/ic_baseline-phone-1.svg"
							alt="telephone icon"
							width={24}
							height={24}
						/>
					</Link>
				</LeftNavigation>

				<ImageContainer>
					<Link href="/">
						<Image
							className={`parkElmLogo ${navIsOpen ? "open" : ""}`}
							src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2024/06/park-elm-updated-logo-white.svg"
							width={223}
							height={73}
							alt="Park Elm at Century Plaza"
						/>

						<Image
							className={`parkElmIcon ${navIsOpen ? "open" : ""}`}
							src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/PE_Icon_GLD.svg"
							width={24}
							height={27}
							alt="Park Elm at Century Plaza Palm Tree Icon"
						/>
					</Link>
				</ImageContainer>

				<RightNavigation>
					<Link
						className={`inquireNav ${navIsOpen ? "open" : ""}`}
						href="/#inquire">
						Inquire
					</Link>
					<Hamburger
						onClick={() => toggleNav()}
						className={navIsOpen ? "open" : ""}>
						<span className="topBar"></span>
						<span className="bottomBar"></span>
					</Hamburger>
				</RightNavigation>
			</HeaderContainer>

			<MobileContainer className={navIsOpen ? "open" : ""}>
				<MobileFlex>
					<MobileImageContainer className="default"></MobileImageContainer>
					<Sidebar>
						<TopLinks>
							<li onClick={() => toggleNav()}>
								<Link href="/#residences">
									Estate Residences
								</Link>
							</li>
							<li onClick={() => toggleNav()}>
								<Link href="/floor-plans">Floor Plans</Link>
							</li>
							<li onClick={() => toggleNav()}>
								<Link href="/#servicesamenities">
									Amenities & Services
								</Link>
							</li>
							<li onClick={() => toggleNav()}>
								<Link href="/#centuryplaza">Neighborhood</Link>
							</li>
							<li onClick={() => toggleNav()}>
								<Link href="/#team">Team</Link>
							</li>
							<li onClick={() => toggleNav()}>
								<Link href="/#inquire">Inquire</Link>
							</li>
						</TopLinks>
						<BottomLinks>
							<li>
								<Link
									target="_blank"
									href="https://www.instagram.com/parkelmcenturyplaza/">
									<Image
										src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2024/01/instagram-rose.svg"
										alt="instagram icon"
										width={24}
										height={24}
									/>
								</Link>
							</li>
							<li>
								<address>
									2025 Avenue of the Stars
									<br />
									Los Angeles, CA 90067
								</address>
							</li>
							<li>
								<Link
									href="tel:+13102464777"
									className="mobiletel">
									<Image
										src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2024/01/telephone-rose.svg"
										alt="telephone icon"
										width={24}
										height={24}
									/>
									310.246.4777
								</Link>
							</li>
						</BottomLinks>
					</Sidebar>
				</MobileFlex>
			</MobileContainer>
		</>
	);
}
