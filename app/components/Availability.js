"use client";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Fancybox from "./FancyBox.js";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

const Availabilityrapper = styled.section`
	width: 100%;
	margin: auto;
	display: block;
	position: relative;

	&.paddingpage {
		padding: 12rem 6rem 6rem 6rem;
	}
	@media screen and (max-width: 820px) {
		&.paddingpage {
			padding: 12rem 4rem 6rem 4rem;
		}
	}
	@media screen and (max-width: 600px) {
		&.paddingpage {
			padding: 12rem 2rem 6rem 2rem;
		}
	}
	@media screen and (max-width: 326px) {
		&.paddingpage {
			padding: 12rem 1rem 6rem 1rem;
		}
	}
`;
const AvailabilityContent = styled.div`
	width: 100%;
	max-width: 600px;
	margin: auto;
	text-align: center;
	display: block;
	padding: 0 0 6rem 0;
	@media screen and (max-width: 326px) {
		padding: 0 1rem 6rem 1rem;
	}
	& h1 {
		font-size: var(--heading);
		padding: 0 0 2rem 0;
		color: var(--rose);
		font-family: var(--font-serif-medium);
		text-align: center;
		font-weight: 500;
	}
	& p {
		font-family: var(--font-sans-serif);
		line-height: 1.5;
	}
	& p a,
	& p a:visited,
	& p a:focus {
		color: var(--rose);
		text-decoration: underline;
	}
`;

const ResidencesAvailability = styled.div`
	width: 100%;
	max-width: 1100px;
	margin: auto;
	display: block;
`;

const ResidenceContainer = styled.div`
	width: 100%;
	padding: 0 0 4rem 0;
	& h2 {
		color: var(--rose);
		font-family: var(--font-serif-medium);
		font-size: var(--smallheading);
		font-weight: 500;
	}
	@media screen and (max-width: 900px) {
		& h2 {
			border-bottom: 1px solid var(--sky);
			padding: 0 0 1rem 0;
		}
	}
`;

const Heading = styled.ul`
	list-style: none;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
	border-bottom: 1px solid var(--sky);
	padding: 1rem 0;
	& li.first {
		width: calc(12% - 1rem);
	}
	& li.inner {
		width: calc(22% - 1rem);
	}
	& li.end {
		width: calc(20% - 1rem);
	}

	& li {
		font-family: var(--font-sans-serif);
		text-transform: uppercase;
		font-weight: 400;
		font-size: var(--body);
		color: var(--black);
	}
	& li.center {
		text-align: center;
	}
	& li.left {
		text-align: left;
	}
	& li.right {
		text-align: right;
	}
	@media screen and (max-width: 900px) {
		display: none;
	}
`;
const SingleResidence = styled.ul`
	list-style: none;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
	padding: 1rem 0;
	border-bottom: 1px solid var(--sky);
	& li.first {
		width: calc(12% - 1rem);
	}
	& li.inner {
		width: calc(22% - 1rem);
	}
	& li.end {
		width: calc(20% - 1rem);
	}
	& li.heading {
		font-family: var(--font-serif-medium);
		font-weight: 500;
		font-size: var(--smallheading);
		color: var(--rose);
	}
	& li.reg {
		font-family: var(--font-sans-serif);
		text-transform: uppercase;
		font-weight: 400;
		font-size: var(--body);
		color: var(--black);
	}
	& li.center {
		text-align: center;
	}
	& li.left {
		text-align: left;
	}
	& li.right {
		text-align: right;
	}
	& li .mobileShowHeading,
	& li .mobileShow {
		display: none;
	}

	& li .videoPopup,
	& li .flpLink {
		display: inline-block;
		padding: 0 0.5rem 0 0;
		cursor: pointer;
	}
	& li .videoPopup .line,
	& li a .line {
		vertical-align: middle;
		width: 1px;
		background: var(--black);
		height: 15px;
		display: inline-block;
		margin: 0 0rem 0 0.5rem;
	}
	& li a,
	& li a:visited,
	& li a:focus {
		transition: 0.2s ease all;
		color: var(--black);
	}
	& li .videoPopup:hover,
	& li a:hover {
		color: var(--rose);
	}
	& li a::hover .link {
		color: var(--black);
	}
	@media screen and (max-width: 900px) {
		border-bottom: 0px solid var(--sky);
		padding: 0rem 0 0 0;
		gap: 0;
		& li.first {
			width: 100%;
		}
		& li.inner {
			width: 50%;
			border-bottom: 1px solid var(--sky);
			padding: 1rem 0;
			position: relative;
		}
		& li.inner.line::after {
			content: "";
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			background: var(--sky);
			width: 1px;
			height: 100%;
			display: block;
		}
		& li.end {
			width: 100%;
		}
		& li .mobileShowHeading,
		& li .mobileShow {
			display: inline;
			color: var(--rose);
		}
		& li.heading {
			padding: 1rem 0;
			border-bottom: 1px solid var(--sky);
		}
		& li.end {
			background: var(--sky);
			padding: 1rem 0;
		}
		& li.end.reg.right {
			text-align: center;
		}
		& li.inner.reg.center {
			text-align: left;
		}
		& li.paddLeft {
			padding-left: 1rem;
		}
	}
	@media screen and (max-width: 500px) {
		& li .mobileShow {
			display: block;
		}
	}
`;

const Modal = styled.div`
	opacity: 0;
	position: fixed;
	display: block;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	z-index: -10;
	background: var(--pearl);
	height: 100vh;
	width: 100%;
	padding: 8rem 6rem;
	transition: all 0.5s ease-in-out;
	-moz-transition: all 0.5s ease-in-out;
	-webkit-transition: all 0.5s ease-in-out;

	&.active {
		z-index: 100000;
		opacity: 1;
	}

	.border {
		width: 100%;
		height: 100%;
		border: 1px solid var(--rose);
		padding: 2rem;
		position: relative;
		display: block;
	}
	.border::after {
		content: "";
		position: absolute;
		top: 2rem;
		bottom: 2rem;
		left: -0.5rem;
		background: var(--sky);
		width: 1rem;
		height: calc(100% - 4rem);
		display: block;
		z-index: 100001;
	}
	.closeBtn {
		background: var(--sky);
		top: 1px;
		right: 1px;
		z-index: 100002;
		display: block;
		position: absolute;
		width: 3rem;
		height: 3rem;
	}
	.closeBtn img {
		width: 100%;
		height: auto;
		max-width: 100%;
		padding: 5px;
	}
	.videoContainer {
		width: 90%;
		position: absolute;
		padding: 0 2rem;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100001;
	}
	video {
		width: 100%;
		height: auto;
	}
	@media screen and (max-width: 900px) {
		padding: 8rem 4rem;
		.videoContainer {
			width: 100%;
			padding: 0 1.5rem;
		}
	}
	@media screen and (max-width: 600px) {
		padding: 8rem 2rem;
	}
`;

export const AvailabilityQueryFragment = `
    ... on Page_Flexiblecontent_Sections_Availability {
        anchor
        fieldGroupName
        hideComponent
        heading
        blurb
        paddingOptions
            residencesRepeater {
                title
                fieldGroupName
                residences {
                    ... on Residence {
                        title
                        singleResidences {
                            bedrooms
                            fieldGroupName
                            price
                            residence
                            squareMeters
                            squareFeet
                            viewDirection
                            floorPlan {
                                altText
                                mediaItemUrl
                                mediaDetails {
                                    height
                                    width
                                }
                            }
                            videoEmbed
                            bathrooms
                        }
                    }
                }
        }
    }
`;

export default function Availability(props) {
	const {
		hideComponent,
		fieldGroupName,
		anchor,
		heading,
		blurb,
		paddingOptions,
		residencesRepeater,
	} = props;

	const [isActive, setActive] = useState(false);

	const toggleClass = () => {
		setActive(!isActive);
	};

	return (
		<Availabilityrapper className={paddingOptions}>
			<AvailabilityContent>
				{heading && <h1 className="black">{heading}</h1>}
				{parse(blurb)}
			</AvailabilityContent>
			<ResidencesAvailability>
				{residencesRepeater.map((item, index) => {
					return (
						<ResidenceContainer key={index}>
							{item.title && <h2>{item.title}</h2>}
							<Heading>
								<li className="first left">Residence</li>
								{/* <li className="inner center">List Price</li> */}
								<li className="inner center">Bed / Bath</li>
								<li className="inner center">SF / SM</li>
								<li className="inner center">View Direction</li>
								<li className="end right">
									Additional Information
								</li>
							</Heading>
							{item?.residences?.map((single, index) => {
								return (
									<>
										<SingleResidence
											key={`single-${index}`}>
											<li className="first heading left">
												<span className="mobileShowHeading">
													Residence{" "}
												</span>
												{
													single?.singleResidences
														?.residence
												}
											</li>
											{/* <li className="inner reg center line">
												<span className="mobileShow">
													Listing Price:{" "}
												</span>
												{
													single?.singleResidences
														?.price
												}
											</li>{" "} */}
											<li className="inner reg center paddLeft">
												<span className="mobileShow">
													Bed / Bath:{" "}
												</span>
												{
													single?.singleResidences
														?.bedrooms
												}{" "}
												/{" "}
												{
													single?.singleResidences
														?.bathrooms
												}
											</li>
											<li className="inner reg center line">
												<span className="mobileShow">
													SQ FT / SQ M:{" "}
												</span>
												{
													single?.singleResidences
														?.squareFeet
												}{" "}
												/{" "}
												{
													single?.singleResidences
														?.squareMeters
												}
											</li>
											<li className="inner reg center paddLeft">
												<span className="mobileShow">
													View Direction:{" "}
												</span>
												{
													single?.singleResidences
														?.viewDirection
												}
											</li>
											<li className="end reg right">
												{single?.singleResidences
													?.floorPlan && (
													<Link
														className="flpLink"
														target="_blank"
														href={
															single
																?.singleResidences
																?.floorPlan
																?.mediaItemUrl
														}>
														Floor Plan{" "}
														<span className="line"></span>
													</Link>
												)}
												{single?.singleResidences
													?.videoMp4
													?.mediaItemUrl && (
													<span
														className="videoPopup"
														onClick={toggleClass}>
														Video{" "}
														<span className="line"></span>
													</span>
												)}{" "}
												<Link
													href="#inquire"
													className="inquire">
													Inquire
												</Link>
											</li>
										</SingleResidence>

										<Modal
											className={
												isActive ? "active" : null
											}>
											<div className="border">
												<div
													onClick={toggleClass}
													class="closeBtn">
													<Image
														src="https://cms.parkelmcenturyplaza.com/wp-content/uploads/2023/12/Close-Icon.svg"
														width={36}
														height={35}
														alt="close icon"
													/>
												</div>
												<div className="videoContainer">
													<video controls muted>
														<source
															src={
																single
																	?.singleResidences
																	?.videoMp4
																	?.mediaItemUrl
															}
															type="video/webm"
														/>
													</video>
												</div>
											</div>
										</Modal>
									</>
								);
							})}
						</ResidenceContainer>
					);
				})}
			</ResidencesAvailability>
		</Availabilityrapper>
	);
}
