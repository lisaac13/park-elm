"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import "flickity/css/flickity.css";
import Flickity from "react-flickity-component";
import styled from "styled-components";
import parse from "html-react-parser";

const TwoColumnContentSliderSection = styled.section`
	background: var(--pearl);
	width: 100%;
	padding: 6rem 0 6rem 4rem;
	position: relative;

	@media only screen and (max-width: 700px) {
		padding: 6rem 0 6rem 2rem;
	}
`;
const InnerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 4rem;
	@media only screen and (max-width: 1024px) {
		flex-direction: column;
		justify-content: left;
	}
`;

const ContentContainer = styled.div`
	width: calc(40% - 2rem);
	padding: 0 6rem 0 0;

	@media only screen and (max-width: 1680px) {
		padding: 0;
		max-width: 424px;
	}
	@media only screen and (max-width: 1024px) {
		width: 100%;
		padding: 0 4rem 0 0;
	}
	@media only screen and (max-width: 700px) {
		width: 100%;
		padding: 0 2rem 0 0;
	}
`;

const Title = styled.h2`
	font-family: var(--font-serif-medium);
	font-size: var(--heading);
	color: var(--rose);
	padding: 0 0 2rem 0;
	font-weight: 500;

	& span {
		font-family: var(--font-serif-med-italic);
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
`;
const Content = styled.p`
	font-family: var(--font-sans-serif);
	color: var(--black);
	font-weight: 500;
	font-size: var(--body);
	line-height: 1.5;
`;
const ImageContainer = styled.div`
	width: calc(60% - 2rem);
	position: relative;

	& .flickity-cell {
		width: 80%;
		margin-right: 2rem;
	}
	& img {
		width: 100%;
		max-width: 100%;
		height: auto;
	}
	@media only screen and (max-width: 1680px) {
		& .flickity-cell {
			width: 80%;
		}
	}
	@media only screen and (max-width: 1024px) {
		width: 100%;
	}
`;

const BottomContainer = styled.div`
	width: 100%;
	position: relative;
	/* padding: 2rem 4rem 0 4rem; */
	padding: 2rem 4rem 0 0;

	display: flex;

	@media only screen and (max-width: 550px) {
		flex-direction: column;
		gap: 1.5rem;
	}
`;

const NavigationContainer = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	gap: 3rem;
	justify-content: flex-end;

	& img {
		cursor: pointer;
		width: 100%;
		max-width: 50px;
		height: auto;
	}
	@media only screen and (max-width: 1680px) {
		& img {
			max-width: 30px;
		}
	}
`;
const Caption = styled.div`
	font-family: var(--font-sans-serif);
	color: var(--black);
	font-weight: 500;
	font-size: var(--body);
	line-height: 1.5;
	flex: 1;
`;

export const TwoColumnContentSliderQueryFragment = `
    ... on Page_Flexiblecontent_Sections_TwoColumnContentSlider {
          anchor
          content
          title
          subtitle
          hideComponent
          fieldGroupName
          images {
           	altText
            mediaItemUrl
			caption
		  }
        }
`;

export default function TwoColumnContentSlider(props) {
	const { anchor, content, title, subtitle, images } = props;
	const twocolslider = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);

	function changeSlider(index) {
		setActiveIndex(index);
		twocolslider.current.select(index);
	}

	return (
		<TwoColumnContentSliderSection>
			{anchor && <a id={anchor} className="anchor" name={anchor}></a>}
			<InnerContainer>
				<ContentContainer>
					<Title>{parse(title)}</Title>
					<Subtitle>{subtitle}</Subtitle>
					<Content>{content}</Content>
				</ContentContainer>
				<ImageContainer>
					<Flickity
						options={{
							cellAlign: "left",
							prevNextButtons: true,
							pageDots: false,
							prevNextButtons: false,
							draggable: true,
							wrapAround: true,
							initialIndex: 1
						}}
						disableImagesLoaded={false} // default false
						reloadOnUpdate={false} // default false
						static // default false
						flickityRef={(c) => {
							twocolslider.current = c;
						}}>
						{images.map((image, index) => (
							<div key={`carousel-${index}`}>
								<Image
									key={`tccs-images-${index}`}
									src={image.mediaItemUrl}
									alt={image.altText}
									width={519}
									height={413}
									style={{ width: "100%", height: "100%" }}
								/>
							</div>
						))}
					</Flickity>
					<BottomContainer>
						<Caption
							dangerouslySetInnerHTML={{
								__html: images[activeIndex].caption,
							}}
						/>
						<NavigationContainer>
							<Image
								src="https://cms.parkelmcenturyplaza.com/wp-content/uploads/2023/10/Left-Arrow-1.svg"
								alt="left arrow"
								width={24}
								height={11}
								onClick={() => twocolslider.current.previous()}
							/>

							<Image
								src="https://cms.parkelmcenturyplaza.com/wp-content/uploads/2023/10/Right-Arrow-1.svg"
								alt="right arrow"
								width={24}
								height={11}
								onClick={() => twocolslider.current.next()}
							/>
						</NavigationContainer>
					</BottomContainer>
				</ImageContainer>
			</InnerContainer>
		</TwoColumnContentSliderSection>
	);
}
