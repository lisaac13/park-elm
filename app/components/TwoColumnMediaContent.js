"use client";
import styled from "styled-components";
import Image from "next/image";

const TwoColumnMediaContentSection = styled.section`
	background: var(--rose);
`;
const InnerContainer = styled.div`
	display: flex;
	gap: 4rem;
	align-items: center;
	justify-content: center;
`;

const MediaContainer = styled.div`
	width: 100%;
	max-width: 560px;
	position: relative;
`;
const StyledImage = styled(Image)`
	width: 100%;
	max-width: 100%;
	height: auto;
`;

const ContentContainer = styled.div`
	width: 100%;
	max-width: 367px;
`;
const Title = styled.h2``;
const Subtitle = styled.p``;
const Content = styled.p``;

export const TwoColumnMediaContentQueryFragment = `
    ... on Page_Flexiblecontent_Sections_TwoColumnMediaContent {
          anchor
          content
          fieldGroupName
          hideComponent
          subtitle
          title
          videoWebm {
            mediaItemUrl
          }
          videoMp4 {
            mediaItemUrl
          }
          imagePoster {
            altText
            mediaItemUrl
          }
        }
`;

export default function TwoColumnMediaContent(props) {
	const {
		anchor,
		content,
		subtitle,
		title,
		videoWebm,
		videoMp4,
		imagePoster,
	} = props;

	return (
		<TwoColumnMediaContentSection>
			{anchor && <a id={anchor}></a>}
			<InnerContainer>
				<MediaContainer>
					{videoMp4 || videoWebm ? (
						<video
							autoPlay
							loop
							muted
							playsInline
							poster={imagePoster}>
							{videoMp4 ? (
								<source
									src={videoMp4?.mediaItemUrl}
									type="video/mp4"
								/>
							) : null}
							{videoWebm ? (
								<source
									src={videoWebm?.mediaItemUrl}
									type="video/webm"
								/>
							) : null}
						</video>
					) : null}
					{!videoMp4 && !videoWebm ? (
						<StyledImage
							src={imagePoster.mediaItemUrl}
							alt={imagePoster.altText}
							width={100}
							height={200}
						/>
					) : null}
				</MediaContainer>
				<ContentContainer>
					<Title>{title}</Title>
					<Subtitle>{subtitle}</Subtitle>
					<Content>{content}</Content>
				</ContentContainer>
			</InnerContainer>
		</TwoColumnMediaContentSection>
	);
}
