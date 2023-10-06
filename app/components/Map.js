"use client";
import styled from "styled-components";
import Image from "next/image";
import parse from "html-react-parser";

const MapSection = styled.section`
	background-image: url(${({ $bg }) => $bg.mediaItemUrl});
	background-repeat: no-repeat;
	background-position: left bottom;
	padding-block: 4rem;
	@media only screen and (max-width: 1150px) {
		background-position: left -30px bottom -50px;
	}
	@media only screen and (max-width: 1010px) {
		background-image: none;
	}
`;
const InnerContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	max-width: 85vw;
	margin-left: auto;
	padding-right: 7vw;

	@media only screen and (max-width: 1150px) {
		margin-inline: auto;
	}

	@media only screen and (max-width: 1010px) {
		max-width: 90vw;
		padding-right: 0;
		margin-left: unset;
		flex-direction: column;
		margin-inline: auto;
		gap: 2rem;
	}
`;
const MapImage = styled(Image)`
	max-width: 100%;
`;
const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	align-self: flex-end;
	@media only screen and (max-width: 820px) {
		align-self: unset;
		width: 100%;
		text-align: center;
	}
`;

const Title = styled.h2`
	width: 100%;
	max-width: 50%;
	font-family: var(--font-serif-medium);
	font-size: var(--heading);
	color: var(--rose);
	font-weight: 500;

	& span {
		font-family: var(--font-serif-med-italic);
	}

	@media only screen and (max-width: 1680px) {
		& {
			max-width: 414px;
		}
	}
	@media only screen and (max-width: 820px) {
		max-width: 100%;
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
		<MapSection $bg={backgroundImage}>
			<InnerContainer>
				<MapImage
					src={mapImage.mediaItemUrl}
					alt={mapImage.altText}
					width={656}
					height={652}
					style={{ width: "100%", height: "auto" }}
				/>
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
