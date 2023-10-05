"use client";

import styled from "styled-components";

const HeroSection = styled.section`
	position: relative;
	width: 100%;
	height: 100%;
	aspect-ratio: 16 / 9;
	background: url(${(props) => props.$bg}) no-repeat center center;
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
		<HeroSection $bg={imagePoster.mediaItemUrl}>
			<StyledVideo autoPlay muted loop playsInline>
				{videoMp4 ? (
					<source
						src={
							videoMp4
								? videoMp4.mediaItemUrl
								: "https://www.youtube.com/watch?v=5qap5aO4i9A"
						}
						type="video/mp4"
					/>
				) : null}
				{videoWebm ? (
					<source
						src={
							videoWebm.mediaItemUrl
								? videoWebm
								: "https://www.youtube.com/watch?v=5qap5aO4i9A"
						}
						type="video/mp4"
					/>
				) : null}
			</StyledVideo>
		</HeroSection>
	);
}
