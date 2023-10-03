"use client";

import styled from "styled-components";

const HeroSection = styled.section`
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

export const HeroQueryFragment = `
    ... on Page_Flexiblecontent_Sections_Hero {
          anchor
          fieldGroupName
          hideComponent
          videoWebm {
            mediaItemUrl
          }
        }
`;

export default function Hero(props) {
	const { anchor, videoMp4, videoWebm } = props;

	if (!videoMp4 && !videoWebm) return null;

	return (
		<HeroSection>
			<StyledVideo autoPlay muted loop playsInline>
				{videoMp4 ? (
					<source
						src={
							videoMp4
								? videoMp4
								: "https://www.youtube.com/watch?v=5qap5aO4i9A"
						}
						type="video/mp4"
					/>
				) : null}
				{videoWebm ? (
					<source
						src={
							videoWebm
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
