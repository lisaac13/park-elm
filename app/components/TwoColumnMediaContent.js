"use client";
import styled from "styled-components";
import Image from "next/image";

const TwoColumnMediaContentSection = styled.section`
	background: var(--rose);
	width: 100%;
	padding: 6rem 4rem 4rem 4rem;
	
	@media only screen and (max-width: 700px) {
		& {
			padding: 6rem 2rem 4rem 2rem;
		}
	}
`;
const InnerContainer = styled.div`
	display: flex;
	gap: 6rem;
	align-items: center;
	justify-content: center;

	@media only screen and (max-width: 820px) {
		& {
			flex-direction: column;
			gap: 4rem;
		}
	}
`;

const MediaContainer = styled.div`
	width: 100%;
	max-width: calc(50% - 3rem);
	position: relative;
	@media only screen and (max-width: 820px) {
		& {
			max-width: 100%;
		}
	}
`;
const StyledImage = styled(Image)`
	width: 100%;
	max-width: 100%;
	height: auto;
`;

const ContentContainer = styled.div`
	width: 100%;
	max-width: calc(50% - 3rem);
	position: relative;
	display: flex;
	justify-content: center;

	@media only screen and (max-width: 820px) {
		& {
			max-width: 100%;
		}
	}
`;

const ContentInner = styled.div`
	width: 100%;
	max-width: 65%;

	@media only screen and (max-width: 1680px) {
		& {
			max-width: 367px;
		}
	}
`;

const Title = styled.h2`
	font-family: var(--font-serif-medium);
	font-size: var(--heading);
	color: var(--pearl);
	font-weight: 500;
	padding: 0 0 2rem 0;

	& span {
		font-family: var(--font-serif-med-italic);
		}
`;
const Subtitle = styled.p`
	font-family: var(--font-sans-serif);
	color: var(--pearl);
	letter-spacing: 0.13rem;
	font-weight: 500;
	text-transform: uppercase;
	font-size: var(--body);
	line-height: 1.5;
	padding: 0 0 1rem 0;
`;
const Content = styled.p`
	font-family: var(--font-sans-serif);
	color: var(--pearl);
	font-weight: 500;
	font-size: var(--body);
	line-height: 1.5;
`;

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
					<ContentInner>
						<Title>{title}</Title>
						<Subtitle>{subtitle}</Subtitle>
						<Content>{content}</Content>
					</ContentInner>
				</ContentContainer>
			</InnerContainer>
		</TwoColumnMediaContentSection>
	);
}
