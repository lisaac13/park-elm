"use client";
import styled from "styled-components";
import Image from "next/image";

const ContentBlockContainer = styled.section``;

export const ContentBlockQueryFragment = `
    ... on Page_Flexiblecontent_Sections_ContentBlock {
          anchor
          fieldGroupName
          hideComponent
          content
        }
`;

export default function ContentBlock(props) {
    const { anchor, content } = props;
    return (
        <ContentBlockContainer>
            {content}
        </ContentBlockContainer>
    )
}