"use client";

import styled from "styled-components";

const HeroSection = styled.section`
	position: relative;
	width: 100%;
	height: 100%;
	aspect-ratio: 16 / 9;
	background-image: url(${(props) => (props.$bg ? props.$bg : "none")})
		no-repeat center center;
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
`;
const StyledVideo = styled.video`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const HeroQueryFragment = `
    ... on Page_Flexiblecontent_Sections_Hero {
          anchor
          fieldGroupName
          hideComponent
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
	const { anchor, videoMp4, imagePoster, videoWebm } = props;

	return (
		<HeroSection $bg={imagePoster?.mediaItemUrl}>
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
		</HeroSection>
	);
}
