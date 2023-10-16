"use client";

import styled from "styled-components";

const HeroSection = styled.section`
	position: relative;
	width: 100%;
`;
const VideoContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	aspect-ratio: 16 / 9;
`;
const StyledVideo = styled.video`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
`;
const ImageContainer = styled.div`
	width: 100%;
	background-image: ${(props) =>
	props.bgImage ? `url(${props.bgImage})` : "none"};
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover !important;
	-webkit-background-size: cover !important;
	-moz-background-size: cover !important;
	-o-background-size: cover !important;
	
	&.full {
		height: 90vh;
	}
	&.half {
		height: 60vh;
	}
`;
export const HeroQueryFragment = `
    ... on Page_Flexiblecontent_Sections_Hero {
          anchor
          fieldGroupName
          hideComponent
		  mediaType
		  height
		  imagePoster {
            mediaItemUrl
          }
          videoMp4 {
            mediaItemUrl
          }
          videoWebm {
            mediaItemUrl
          }
        }
`;

export default function Hero(props) {
	const { anchor, videoMp4, imagePoster, videoWebm, mediaType, height } = props;

	return (
		<HeroSection>
			{mediaType == "video" ? (
			<VideoContainer>
			<StyledVideo autoPlay muted loop playsInline>
				{videoMp4 ? (
					<source
						src={videoMp4 ? videoMp4.mediaItemUrl : ""}
						type="video/mp4"
					/>
				) : null}
				{videoWebm ? (
					<source
						src={videoWebm.mediaItemUrl ? videoWebm : ""}
						type="video/mp4"
					/>
				) : null}
			</StyledVideo>
			</VideoContainer>
			) : null}
			{mediaType == "image" ? (
				<ImageContainer className={height} bgImage={imagePoster?.mediaItemUrl}>

				</ImageContainer>
			) : null}
		</HeroSection>
	);
}
