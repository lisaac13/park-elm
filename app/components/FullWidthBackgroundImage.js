"use client";

import styled from "styled-components";

const Section = styled.section`
  background: url(${(props) => props.$bg}) no-repeat center center;
	min-height: 60vh;
  width: 100%;
  display: block;
  margin: auto;
  background-size: cover !important;
	-webkit-background-size: cover !important;
	-moz-background-size: cover !important;
  overflow: hidden;
`;

export const FullWidthBackgroundImageQueryFragment = `
    ... on Page_Flexiblecontent_Sections_FullWidthBackgroundImage {
          anchor
          fieldGroupName
          hideComponent
          imagePoster {
            mediaItemUrl
          }
        }
`;

export default function FullWidthBackgroundImage(props) {
	const { anchor, imagePoster } = props;
	return (
		<Section $bg={imagePoster?.mediaItemUrl}>
			{anchor && <a id={anchor}></a>}
		</Section>
	);
}
