"use client";
import styled from "styled-components";
import parse from "html-react-parser";

const TwoColumnTextContentSection = styled.section`
	width: 100%;
	background: var(--pearl);
	padding: 6rem 0 6rem 0;
`;
const InnerContainer = styled.div`
	display: flex;
	gap: 4rem;
	align-items: flex-start;
	justify-content: center;
`;
const Title = styled.h2`
	max-width: 465px;
	font-family: var(--font-serif-medium);
	font-size: var(--heading);
	color: var(--rose);
	font-weight: 500;

	& span {
		font-family: var(--font-serif-med-italic);
	}
`;
const ContentContainer = styled.div`
	max-width: 367px;
`;
const Subtitle = styled.p`
	font-family: var(--font-sans-serif);
	color: var(--rose);
	letter-spacing: 0.13rem;
	font-weight: 500;
	text-transform: uppercase;
	font-size: var(--body);
	line-height: 1.5;
	padding: 0 0 1rem 0;
`;
const Content = styled.p`
	font-family: var(--font-sans-serif);
	color: var(--black);
	font-weight: 500;
	font-size: var(--body);
	line-height: 1.5;
`;

export const TwoColumnTextContentSectionQueryFragment = `
    ... on Page_Flexiblecontent_Sections_TwoColumnTitleContent {
          anchor
          content
          fieldGroupName
          hideComponent
          subtitle
          title
        }
`;

export default function TwoColumnTextContent(props) {
	const { anchor, content, subtitle, title } = props;
	return (
		<TwoColumnTextContentSection>
			{anchor && <a id={anchor}></a>}
			<InnerContainer>
				<Title>{parse(title)}</Title>
				<ContentContainer>
					<Subtitle>{subtitle}</Subtitle>
					<Content>{content}</Content>
				</ContentContainer>
			</InnerContainer>
		</TwoColumnTextContentSection>
	);
}
