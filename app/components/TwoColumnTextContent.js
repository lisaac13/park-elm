"use client";
import styled from "styled-components";
import parse from "html-react-parser";

const TwoColumnTextContentSection = styled.section`
	width: 100%;
	background: var(--pearl);
	padding: 6rem 4rem;

	@media only screen and (max-width: 700px) {
		& {padding: 6rem 2rem;}
	}
`;
const InnerContainer = styled.div`
	display: flex;
	gap: 6rem;
	align-items: flex-start;
	justify-content: center;

	@media only screen and (max-width: 820px) {
		& {
			flex-direction: column;
			gap: 2rem;
		}
	}
`;

const TitleContainer = styled.div`
	width: 100%;
	max-width: calc(50% - 3rem);
	position: relative;
	display: flex;
	justify-content: center;

	@media only screen and (max-width: 820px) {
		& {
			max-width: 100%;
		}
	}
`;
	
const Title = styled.h2`
	width: 100%;
	max-width: 50%;
	font-family: var(--font-serif-medium);
	font-size: var(--heading);
	color: var(--rose);
	font-weight: 500;

	& span {
		font-family: var(--font-serif-med-italic);
	}

	@media only screen and (max-width: 1680px) {
		& {max-width: 414px;}
	}
`;
const ContentContainer = styled.div`
	width: 100%;
	max-width: calc(50% - 3rem);

	@media only screen and (max-width: 820px) {
		& {
			width: 100%;
			max-width: 100%;
		}
	}
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

	@media only screen and (max-width: 1680px) {
		& {max-width: 367px;}
	}
	@media only screen and (max-width: 820px) {
		& {margin: auto;}
	}
`;
const Content = styled.p`
	max-width: 60%;
	font-family: var(--font-sans-serif);
	color: var(--black);
	font-weight: 500;
	font-size: var(--body);
	line-height: 1.5;

	@media only screen and (max-width: 1680px) {
		& {max-width: 367px;}
	}

	@media only screen and (max-width: 820px) {
		& {margin: auto;}
	}
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
			{anchor && <a id={anchor} name={anchor}></a>}
			<InnerContainer>
				<TitleContainer>
					<Title>{parse(title)}</Title>
				</TitleContainer>
				<ContentContainer>
					<Subtitle>{subtitle}</Subtitle>
					<Content>{content}</Content>
				</ContentContainer>
			</InnerContainer>
		</TwoColumnTextContentSection>
	);
}
