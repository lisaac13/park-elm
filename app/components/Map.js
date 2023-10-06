"use client";
import styled from "styled-components";
import Image from "next/image";
import parse from "html-react-parser";

const MapSection = styled.section`
	width: 100%;
	padding: 6rem 4rem;

	@media only screen and (max-width: 700px) {
		padding: 6rem 2rem;
	}
`;
const InnerContainer = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	width: 100%;
	gap: 6rem;

	@media only screen and (max-width: 820px) {
		flex-direction: column;
	}
`;
const ImageContainer = styled.div`
	width: 100%;
	max-width: calc(70% - 3rem);
	position: relative;

	@media only screen and (max-width: 1220px) {
		width: 100%;
		max-width: calc(65% - 3rem);
	}
	@media only screen and (max-width: 1024px) {
		width: 100%;
		max-width: calc(55% - 3rem);
	}
	@media only screen and (max-width: 820px) {
		width: 100%;
		max-width: 100%;
	}
`
const MapImage = styled(Image)`
	width: 100%;
	max-width: 100%;
	height: auto;
`;
const ContentContainer = styled.div`
	width: 100%;
	max-width: calc(30% - 3rem);
	position: relative;

	@media only screen and (max-width: 1220px) {
		width: 100%;
		max-width: calc(35% - 3rem);
	}

	@media only screen and (max-width: 1024px) {
		width: 100%;
		max-width: calc(45% - 3rem);
	}
	@media only screen and (max-width: 820px) {
		width: 100%;
		max-width: 100%;
	}
`;

const Title = styled.h2`
	width: 100%;
	max-width: 100%;
	font-family: var(--font-serif-medium);
	font-size: var(--heading);
	color: var(--rose);
	font-weight: 500;
	padding: 0 0 2rem 0;

	& span {
		font-family: var(--font-serif-med-italic);
	}

	@media only screen and (max-width: 1680px) {
		& {
			max-width: 367px;
		}
	}
	@media only screen and (max-width: 820px) {
		& {
			margin: auto;
		}
	}
`;
const Subtitle = styled.p`
	font-family: var(--font-sans-serif);
	color: var(--rose);
	letter-spacing: 0.13rem;
	font-weight: 500;
	text-transform: uppercase;
	font-size: var(--body);
	line-height: 1.5;
	padding: 0 0 1rem 0;

	@media only screen and (max-width: 1680px) {
		& {
			max-width: 367px;
		}
	}
	@media only screen and (max-width: 820px) {
		& {
			margin: auto;
		}
	}
`;
const Content = styled.p`
	max-width: 60%;
	font-family: var(--font-sans-serif);
	color: var(--black);
	font-weight: 500;
	font-size: var(--body);
	line-height: 1.5;
	padding-bottom: 1rem;

	@media only screen and (max-width: 1680px) {
		& {
			max-width: 367px;
		}
	}

	@media only screen and (max-width: 820px) {
		& {
			margin: auto;
		}
	}
`;

const Destinations = styled.div``;
const Destination = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	font-family: var(--font-sans-serif);
	color: var(--black);
	font-weight: 500;
	font-size: var(--body);
	line-height: 1.5;

	@media only screen and (max-width: 1680px) {
		& {
			max-width: 367px;
		}
	}

	@media only screen and (max-width: 820px) {
		& {
			margin: auto;
		}
	}
`;

export const MapQueryFragment = `
... on Page_Flexiblecontent_Sections_Map {
          anchor
          content
          backgroundImage {
            altText
            mediaItemUrl
          }
          subtitle
          title
          hideComponent
          fieldGroupName
          destinations {
            time
            title
          }
          mapImage {
            altText
            mediaItemUrl
          }
        }
        `;

export default function Map(props) {
	const {
		anchor,
		content,
		backgroundImage,
		subtitle,
		title,
		destinations,
		mapImage,
	} = props;

	return (
		<MapSection>
			{anchor && <a id={anchor} className="anchor" name={anchor}></a>}
			<InnerContainer>
				<ImageContainer>
				<MapImage
					src={mapImage.mediaItemUrl}
					alt={mapImage.altText}
					width={656}
					height={652}
					style={{ width: "100%", height: "auto" }}
				/>
				</ImageContainer>
				<ContentContainer>
					<Title>{parse(title)}</Title>
					<Subtitle>{subtitle}</Subtitle>
					<Content>{content}</Content>
					<Destinations>
						{destinations.map((destination, index) => {
							return (
								<Destination key={`destination-${index}`}>
									<p>{destination.title}</p>
									<p>{destination.time}</p>
								</Destination>
							);
						})}
					</Destinations>
				</ContentContainer>
			</InnerContainer>
		</MapSection>
	);
}
