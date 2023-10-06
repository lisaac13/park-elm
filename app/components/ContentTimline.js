"use client";
import styled from "styled-components";

const ContentTimlineSection = styled.section`
	padding-block: 6rem;
`;
const InnerContainer = styled.div``;
const Supertitle = styled.p`
	font-family: var(--font-sans-serif);
	color: var(--rose);
	letter-spacing: 0.13rem;
	font-weight: 500;
	text-transform: uppercase;
	font-size: var(--body);
	line-height: 1.5;
	padding: 0 0 1rem 0;
	text-align: center;
	margin: 0 auto;

	@media only screen and (max-width: 1680px) {
		& {
			max-width: 367px;
		}
	}
	@media only screen and (max-width: 820px) {
		& {
			margin: auto;
		}
	}
`;
const Content = styled.p``;
const Title = styled.h2`
	width: 100%;
	font-family: var(--font-serif-medium);
	font-size: var(--heading);
	color: var(--rose);
	font-weight: 500;
	text-align: center;
	margin: 0 auto 5rem;
	padding-inline: 2rem;
`;
const TimelineContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 20px 1fr;
	width: 72vw;
	margin: 0 auto;
	gap: 2rem;

	@media only screen and (max-width: 900px) {
		width: 80vw;
	}
	@media only screen and (max-width: 700px) {
		grid-template-columns: 1fr;
	}
`;
const TimelineItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
const TimelineItemTitle = styled.h3`
	font-family: var(--font-sans-serif);
	color: var(--rose);
	letter-spacing: 0.13rem;
	font-weight: 500;
	text-transform: uppercase;
	font-size: var(--body);
	line-height: 1.5;
	padding: 0 0 1rem 0;

	@media only screen and (max-width: 1680px) {
		& {
			max-width: 367px;
		}
	}
	@media only screen and (max-width: 820px) {
		& {
			margin: auto;
		}
	}
`;
const TimelineItemContent = styled.p`
	font-family: var(--font-sans-serif);
	color: var(--black);
	font-weight: 500;
	font-size: var(--body);
	line-height: 1.5;
	max-width: 367px;

	@media only screen and (max-width: 1680px) {
		& {
		}
	}

	@media only screen and (max-width: 820px) {
		& {
			margin: auto;
		}
	}
`;
const Left = styled.div`
	grid-column: 1 / 2;
	display: flex;
	gap: 4rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media only screen and (max-width: 700px) {
		grid-column: span 1;
	}
`;
const Right = styled.div`
	grid-column: 3 / 4;
	display: flex;
	gap: 4rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media only screen and (max-width: 700px) {
		grid-column: span 1;
	}
`;
const Divider = styled.div`
	width: 100%;
	height: 100%;
	grid-column: 2/3;
	grid-row: 1/-1;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	@media only screen and (max-width: 700px) {
		display: none;
	}
`;
const BarOne = styled.div`
	background-color: var(--rose);
	width: 1px;
	height: 100%;
	position: absolute;
	top: 0;
	z-index: 2;
	left: 9px;
`;
const BarTwo = styled.div`
	background-color: var(--sky);
	width: 100%;
	height: 90%;
`;

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
				<TimelineContainer>
					<Left>
						{timelineSections.map((item, index) => {
							if (index % 2 == 1) return;

							return (
								<TimelineItem key={`timeline-${index}`}>
									<TimelineItemTitle>
										{item.title}
									</TimelineItemTitle>
									<TimelineItemContent>
										{item.content}
									</TimelineItemContent>
								</TimelineItem>
							);
						})}
					</Left>
					<Right>
						{timelineSections.map((item, index) => {
							if (index % 2 !== 1) return;

							return (
								<TimelineItem key={`timeline-${index}`}>
									<TimelineItemTitle>
										{item.title}
									</TimelineItemTitle>
									<TimelineItemContent>
										{item.content}
									</TimelineItemContent>
								</TimelineItem>
							);
						})}
					</Right>
					<Divider>
						<BarOne />
						<BarTwo />
					</Divider>
				</TimelineContainer>
			</InnerContainer>
		</ContentTimlineSection>
	);
}
