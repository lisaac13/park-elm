"use client";
import styled from "styled-components";
import Image from "next/image";

const FullWidthImagewithOverlay = styled.section``;

export const FullWidthImageWithOverlayQueryFragment = `
    ... on Page_Flexiblecontent_Sections_FullWidthImageWithOverlay {
          anchor
          fieldGroupName
          hideComponent
          content
          imagePoster {
            altText
            mediaItemUrl
          }
        }
`;

export default function FullWidthImageWithOverlay(props) {
    const { anchor, content, imagePoster } = props;
    return (
    <FullWidthImagewithOverlay>
        <Image
        src={imagePoster.mediaItemUrl}
        alt={imagePoster.altText}
        width={1140}
        height={650}/>
        {content}
    </FullWidthImagewithOverlay>
    )
}