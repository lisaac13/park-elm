"use client";
import styled from "styled-components";

const TwoColumnTextContentSection = styled.section``;
const InnerContainer = styled.div``;
const Title = styled.h2``;
const ContentContainer = styled.div``;
const Subtitle = styled.p``;
const Content = styled.p``;

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
				<Title>{title}</Title>
				<ContentContainer>
					<Subtitle>{subtitle}</Subtitle>
					<Content>{content}</Content>
				</ContentContainer>
			</InnerContainer>
		</TwoColumnTextContentSection>
	);
}
