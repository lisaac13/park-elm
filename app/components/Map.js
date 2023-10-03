"use client";
import styled from "styled-components";
import Image from "next/image";

const MapSection = styled.section`
	background-image: url(${({ $bg }) => $bg.mediaItemUrl});
`;
const InnerContainer = styled.div``;
const MapImage = styled(Image)``;
const ContentContainer = styled.div``;

const Title = styled.h2``;
const Subtitle = styled.p``;
const Content = styled.p``;

const Destinations = styled.div``;
const Destination = styled.div``;

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
				<MapImage src={mapImage.mediaItemUrl} alt={mapImage.altText} />
				<ContentContainer>
					<Title>{title}</Title>
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
