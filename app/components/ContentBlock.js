"use client";
import styled from "styled-components";
import Image from "next/image";
import parse from "html-react-parser";

const ContentBlockContainer = styled.section`
width: 100%;
max-width: 1000px;
margin: auto;

[data-page="/privacy-policy"] &,
[data-page="/accessibility"] & {
    padding: 10rem 2rem 6rem 2rem;
}

& h3,
& h2,
& h1 {
    font-family: var(--font-serif-medium);
}
& h1 {
	font-size: var(--heading);
	color: var(--rose);
}
& h2 {
	color: var(--rose);
	margin: 1rem 0;
}
& ul li, 
& ol li,
& p {
	color: var(--black);
	font-family: var(--font-sans-serif);
	font-size: var(--body);
	margin: 1rem 0;
}

& ul li,
& ol li{
	margin-inline-start: 3rem;
    line-height: 1.5;
}
& p a {
	text-decoration: underline;
	color: var(--rose);
}
`;

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
            {parse(content)}
        </ContentBlockContainer>
    )
}