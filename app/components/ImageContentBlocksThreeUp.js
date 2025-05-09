"use client";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const ImageContentBlockWrapper = styled.section`
	width: 100%;
	margin: auto;
	display: inline-block;
	position: relative;

	& h3 {
		font-family: var(--font-serif);
		text-transform: uppercase;
		font-size: var(--heading);
		display: block;
		font-weight: 400;
		margin: auto;
		text-align: center;
		padding: 0 0 2rem 0;
	}
	@media only screen and (max-width: 600px) {
		& h3 {
			font-size: 1.5rem;
		}
	}
`;

const ContentBlockContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 2rem;
`;

const Block = styled.div`
	width: calc(33.33% - 1.5rem);
	position: relative;
	border: 1px solid var(--rose);

	& img {
		width: 100%;
		height: auto;
		max-width: 100%;
		border-bottom: 1px solid var(--rose);
	}
	@media only screen and (max-width: 1024px) {
		& {
			width: calc(33.33% - 1.5rem);
		}
	}
	@media only screen and (max-width: 820px) {
		& {
			width: calc(50% - 1.5rem);
		}
	}
	@media only screen and (max-width: 600px) {
		& {
			width: 100%;
		}
	}
`;

const CustomBlock = styled.a`
	width: calc(25% - 1.5rem);
	position: relative;
	border: 1px solid var(--rose);

	& img {
		width: 100%;
		height: auto;
		max-width: 100%;
		border-bottom: 1px solid var(--rose);
	}
	@media only screen and (max-width: 1024px) {
		& {
			width: calc(33.33% - 1.5rem);
		}
	}
	@media only screen and (max-width: 820px) {
		& {
			width: calc(50% - 1.5rem);
		}
	}
	@media only screen and (max-width: 600px) {
		& {
			width: 100%;
		}
	}
`;

const TextContainer = styled.div`
	display: flex;
	padding: 1rem;
	align-items: center;
	gap: 1rem;
	justify-content: space-between;

	& h4 {
		font-family: var(--font-sans-serif);
		text-transform: uppercase;
		font-size: var(--body);
		font-weight: 400;
		letter-spacing: 0.13rem;
		color: var(--black);
	}

	& .icon {
		width: 21px;
		height: arrow;
		border: 0px;
	}
`;

function DigitalBrochure() {
	return (
		<>
			<Script src="//static.fliphtml5.com/web/js/plugin/LightBox/js/fliphtml5-light-box-api-min.js" />
			<Block key={99}>
				<a
					data-rel="fh5-light-box-demo"
					data-href="https://online.fliphtml5.com/bzmsn/ftpg/"
					data-width="1440"
					data-height="900"
					data-title="">
					<Image
						src={
							"https://cms.parkelmcenturyplaza.com/wp-content/uploads/2023/10/edit_0004_Brochure.jpg"
						}
						alt="tower"
						width={700}
						height={700}
					/>
					<TextContainer>
						<h4>Brochure</h4>
						<Image
							className="icon"
							src="https://cms.parkelmcenturyplaza.com/wp-content/uploads/2023/10/iconoir_arrow-tr-2.svg"
							alt="pdf icon"
							width={21}
							height={27}
						/>
					</TextContainer>
				</a>
			</Block>
		</>
	);
}

export const ImageContentBlocksThreeUpQueryFragment = `
    ... on Page_Flexiblecontent_Sections_ImageContentBlocksThreeUp {
        hideComponent
        fieldGroupName
        heading
		anchor
        paddingOptions
        contentBlocks {
            ... on Page_Flexiblecontent_Sections_ImageContentBlocksThreeUp_contentBlocks {
                title
                linkType
                link
                image {
                    mediaItemUrl
                    altText
                    mediaDetails {
                        height
                        width
                    }
                }
            }
        }
    }
`;

export default function ImageContentBlocksThreeUp(props) {
	const {
		hideComponent,
		fieldGroupName,
		anchor,
		heading,
		paddingOptions,
		contentBlocks,
	} = props;

	const [articles, _] = useState(contentBlocks);

	return (
		<ImageContentBlockWrapper className={paddingOptions}>
			{heading && <h3 className="black">{heading}</h3>}
			<ContentBlockContainer>
				{contentBlocks &&
					articles.map((contentBlock, index) => {
						return (
							<Block key={index}>
								{contentBlock.linkType === "pdf" && (
									<Link
										href={contentBlock.link}
										target="_blank">
										<Image
											src={
												contentBlock.image.mediaItemUrl
											}
											alt={contentBlock.image.altText}
											width={
												contentBlock.image.mediaDetails
													.width
											}
											height={
												contentBlock.image.mediaDetails
													.height
											}
										/>
										<TextContainer>
											<h4>{contentBlock.title}</h4>
											<Image
												className="icon"
												src="https://cms.parkelmcenturyplaza.com/wp-content/uploads/2025/05/pdficon_converted.png"
												alt="pdf icon"
												width={21}
												height={27}
											/>
										</TextContainer>
									</Link>
								)}

								{contentBlock.linkType === "externallink" && (
									<Link href={contentBlock.link}>
										<Image
											src={
												contentBlock.image.mediaItemUrl
											}
											alt={contentBlock.image.altText}
											width={
												contentBlock.image.mediaDetails
													.width
											}
											height={
												contentBlock.image.mediaDetails
													.height
											}
										/>
										<TextContainer>
											<h4>{contentBlock.title}</h4>
											<Image
												className="icon"
												src="https://cms.parkelmcenturyplaza.com/wp-content/uploads/2025/05/angledArrow_converted.png"
												alt="angled arrow icon"
												width={16}
												height={16}
											/>
										</TextContainer>
									</Link>
								)}
							</Block>
						);
					})}
			</ContentBlockContainer>
		</ImageContentBlockWrapper>
	);
}
