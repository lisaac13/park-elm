"use client";

import styled from "styled-components";

const FullWidthBackgroundImageSection = styled.section`
	background-image: url(${(props) => props.$bg});
	min-height: 60vh;
`;

export const FullWidthBackgroundImageQueryFragment = `
    ... on Page_Flexiblecontent_Sections_FullWidthBackgroundImage {
          anchor
          fieldGroupName
          hideComponent
          image {
            altText
            mediaItemUrl
          }
        }
`;

export default function FullWidthBackgroundImage(props) {
	const { anchor, image } = props;
	return (
		<FullWidthBackgroundImageSection $bg={image}>
			{anchor && <a id={anchor}></a>}
		</FullWidthBackgroundImageSection>
	);
}
