"use client";
import styled from "styled-components";

const ContentTimlineSection = styled.section``;
const InnerContainer = styled.div``;
const Supertitle = styled.p``;
const Title = styled.h2``;
const Content = styled.p``;
const TimelineContainer = styled.div``;
const TimelineItem = styled.div``;
const TimelineItemTitle = styled.h3``;
const TimelineItemContent = styled.p``;
const Divider = styled.div``;

export const ContentTimlineQueryFragment = `
    ... on Page_Flexiblecontent_Sections_ContentTimeline {
          anchor
          content
          fieldGroupName
          hideComponent
          supertitle
          title
          timelineSections {
            title
            content
          }
        }
`;

export default function ContentTimline(props) {
	const { anchor, content, supertitle, title, timelineSections } = props;
	return (
		<ContentTimlineSection>
			{anchor && <a id={anchor}></a>}
			<InnerContainer>
				<Supertitle>{supertitle}</Supertitle>
				<Title>{title}</Title>
				<Content>{content}</Content>
				<TimelineContainer>
					{/* //definitely a way to keep this dynamic */}
					{timelineSections.map((item, index) => {
						return (
							<TimelineItem key={`timeline-${index}`}>
								<TimelineItemTitle></TimelineItemTitle>
								<TimelineItemContent></TimelineItemContent>
							</TimelineItem>
						);
					})}
				</TimelineContainer>
				<Divider />
			</InnerContainer>
		</ContentTimlineSection>
	);
}
