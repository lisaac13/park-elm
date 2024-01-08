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

	@media only screen and (max-width: 600px) {
		padding: 4rem 2rem;
	}
`;

const ImageContainer = styled.div`
	max-width: 209px;
	position: relative;

	& img {
		width: 100%;
		max-width: 100%;
		height: auto;
	}
	@media only screen and (max-width: 515px) {
		& {
			max-width: 150px;
			position: relative;
		}
	}
`;

const MobileAddress = styled.div`
	display: none;

	@media only screen and (max-width: 1024px) {
		display: block;
		padding: 2rem 0 0 0;

		& address {
			font-family: var(--font-serif-med-italic);
			color: var(--pearl);
			font-size: var(--address);
		}
	}
	@media only screen and (max-width: 515px) {
		& {
			display: none;
		}
	}
`;
const Address = styled.div`
	& address {
		font-family: var(--font-serif-med-italic);
		color: var(--pearl);
		font-size: var(--address);
	}

	@media only screen and (max-width: 1024px) {
		& {
			display: none;
		}
	}
`;

const FooterLinks = styled.ul`
	list-style: none;

	& li {
		padding: 0 0 0.5rem 0;
		font-family: var(--font-sans-serif);
		font-size: var(--cta);
		color: var(--pearl);
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
	}

	& li.xsmobile,
	& li.mobile {
		display: none;
	}

	@media only screen and (max-width: 900px) {
		& li.mobile {
			display: block;
			opacity: 0.7;
		}
		& li.mobile.first {
			padding: 1rem 0 0.5rem 0;
		}
		& li.mobile.social {
			padding: 1rem 0 0rem 0;
			opacity: 1;
		}
	}
	@media only screen and (max-width: 515px) {
		& li.xsmobile {
			display: block;
		}
		& li.xsmobile address {
			font-family: var(--font-serif-med-italic);
			color: var(--pearl);
			text-transform: none;
			font-size: 1.1rem;
			padding: 0 0 1rem 0;
			letter-spacing: 0;
			line-height: 1.3;
		}
	}
`;

const FooterLinksTwo = styled.ul`
	list-style: none;

	& li {
		padding: 0 0 0.5rem 0;
		font-family: var(--font-sans-serif);
		font-size: var(--cta);
		color: var(--pearl);
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		opacity: 0.7;
	}

	@media only screen and (max-width: 900px) {
		display: none;
	}
`;

const SocialContainer = styled.div`
	@media only screen and (max-width: 900px) {
		display: none;
	}
`;

const BottomContainer = styled.div`
	width: 100%;
	border-top: 0.5px solid rgba(247, 247, 245, 0.5);
	position: relative;
`;

const BottomFlexContainer = styled.div`
	width: 100%;
	padding: 2rem 4rem;
	display: flex;
	flex-wrap: wrap;
	gap: 4rem;

	@media only screen and (max-width: 1024px) {
		& {
			flex-direction: column;
			gap: 2rem;
		}
	}
	@media only screen and (max-width: 600px) {
		& {
			padding: 2rem 2rem;
		}
	}
`;

const Disclaimer = styled.div`
	width: calc(65% - 2rem);
	& p {
		color: var(--pearl);
		font-family: var(--font-sans-serif);
		font-size: clamp(0.7rem, 0.7vw, 1rem);
		line-height: 1.3;
		opacity: 0.7;
	}
	& p.generic {
		display: block;
	}
	& p.savills {
		display: none;
	}
	[data-page="/savills-broker-portal"] & p.savills {display: block;}
	[data-page="/savills-broker-portal"] & p.generic {display: none;}
	@media only screen and (max-width: 1220px) {
		& {
			width: calc(60% - 2rem);
		}
	}
	@media only screen and (max-width: 1024px) {
		& {
			width: 100%;
		}
	}
`;

const DeveloperContainer = styled.ul`
	width: calc(35% - 2rem);
	list-style: none;
	display: flex;
	gap: 2rem;
	align-items: center;
	justify-content: flex-end;

	& li .equalHousiing {
		width: 100%;
		max-width: 30px;
		height: auto;
	}
	& li .ncpLogo {
		width: 100%;
		max-width: 55px;
		height: auto;
	}
	& li .agencyLogo {
		width: 100%;
		max-width: 80px;
		height: auto;
	}
	& li .reubenbrothersLogo {
		width: 100%;
		max-width: 150px;
		height: auto;
	}

	@media only screen and (max-width: 1220px) {
		& {
			width: calc(40% - 2rem);
		}
	}

	@media only screen and (max-width: 1024px) {
		& {
			width: 100%;
		}
	}
`;

export default function Footer() {
	return (
		<StyledFooter>
			<InnerContainer>
				<ImageContainer>
					<Link href="/">
						<Image
							src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/PE_LogoIcon_GLD_white.svg"
							width={209}
							height={118}
							alt="Park Elm at Century Park Logo with Palm Icon"
						/>
					</Link>
					<MobileAddress>
						<address>
							2025 Avenue of the Stars
							<br />
							Los Angeles, CA 90067
						</address>
					</MobileAddress>
				</ImageContainer>
				<Address>
					<address>
						2025 Avenue of the Stars
						<br />
						Los Angeles, CA 90067
					</address>
				</Address>
				<FooterLinks>
					<li className="xsmobile">
						<address>
							2025 Avenue of the Stars
							<br />
							Los Angeles, CA 90067
						</address>
					</li>
					<li>
						<Link href="/#residences">Residences</Link>
					</li>
					<li>
						<Link href="/#servicesamenities">
							Services & Amenities
						</Link>
					</li>
					<li>
						<Link href="/#centuryplaza">Century Plaza</Link>
					</li>
					<li>
						<Link href="/#neighborhood">Neighborhood</Link>
					</li>
					<li>
						<Link href="/#team">Team</Link>
					</li>
					<li>
						<Link href="/floor-plans">Floor Plans</Link>
					</li>
					<li className="mobile first">
						<Link href="/privacy-policy">Policies</Link>
					</li>
					<li className="mobile">
						<Link href="/accessibility">Accessibility</Link>
					</li>
					<li className="mobile social">
						<Link
							target="_blank"
							href="https://www.instagram.com/parkelmcenturyplaza/">
							<Image
								src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/instagram.svg"
								alt="instagram icon"
								width={24}
								height={24}
							/>
						</Link>
					</li>
				</FooterLinks>
				<FooterLinksTwo>
					<li>
						<Link href="/privacy-policy">Policies</Link>
					</li>
					<li>
						<Link href="/accessibility">Accessibility</Link>
					</li>
				</FooterLinksTwo>

				<SocialContainer>
					<Link
						target="_blank"
						href="https://www.instagram.com/parkelmcenturyplaza/">
						<Image
							src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/instagram.svg"
							alt="instagram icon"
							width={24}
							height={24}
						/>
					</Link>
				</SocialContainer>
			</InnerContainer>

			<BottomContainer>
				<BottomFlexContainer>
					<Disclaimer>
						<p className="generic">
							All floor plans shown are for illustrative purposes
							only. Floor plans may not depict final designs of
							units as constructed. All dimensions and square
							footages are approximate and subject to normal
							construction variances and tolerances and changes
							resulting from unforeseen conditions. Dimensions and
							square footages include certain perimeter and
							interior walls, windows, shafts, columns and other
							structural elements. The developer reserves the
							right to make modifications to the floor plans and
							unit dimensions at any time. Exclusive sales and
							marketing: Next Century Realty, Inc., DRE #
							02028123. The Agency Development Group DRE #01973483
							&nbsp;
							<Image
								src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/equal-housing-opportunity-black-copy-1.svg"
								alt="equal housing opportunity logo"
								width={16}
								height={17}
								className="equalHousiing"
								style={{ height: ".7rem", width: "auto" }}
							/>
						</p>
						<p className="savills">
						These details have been prepared in good faith but are not intended to constitute 
						part of any offer of contract or create any contractual relationship. No description 
						orinformation of any kind contained in these particulars may be relied upon as a 
						statement or representation, warranty or fact. All images, plans and specifications 
						shown are indicative only, cannot be guaranteed to represent the complete interiors or 
						exteriors of the project and are subject to change due to design coordination and other 
						development considerations. Any areas, measurements or distances given are approximate only. 
						It is not possible to scale exactly from these drawings. Any buyer must satisfy themselves 
						by inspection or otherwise as to the correctness of any information given. All rights 
						reserved to Next Century Partners. &nbsp;
							<Image
								src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/equal-housing-opportunity-black-copy-1.svg"
								alt="equal housing opportunity logo"
								width={16}
								height={17}
								className="equalHousiing"
								style={{ height: ".7rem", width: "auto" }}
							/>
						</p>
					</Disclaimer>
					<DeveloperContainer>
						{/* <li>
							<Image
								src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/equal-housing-opportunity-black-copy-1.svg"
								alt="equal housing opportunity logo"
								width={30}
								height={31}
								className="equalHousiing"
							/>
						</li> */}
						<li>
							<Image
								src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/ncp-logo.svg"
								alt="ncp logo"
								width={55}
								height={33}
								className="ncpLogo"
							/>
						</li>
						<li>
							<Image
								src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/agency-logo.png"
								alt="the agency logo"
								width={80}
								height={80}
								className="agencyLogo"
							/>
						</li>
						<li>
							<Image
								src="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/10/reuben-brothers-logo.svg"
								alt="reuben brothers logo"
								width={150}
								height={25}
								className="reubenbrothersLogo"
							/>
						</li>
					</DeveloperContainer>
				</BottomFlexContainer>
			</BottomContainer>
		</StyledFooter>
	);
}
