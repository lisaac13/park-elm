"use client";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const SingleColumnSliderSection = styled.section`
	width: 100%;
	padding: 6rem 4rem;
	position: relative;
	display: block;
	background: var(--rose);

	@media only screen and (max-width: 700px) {
		padding: 0rem 2rem 6rem 2rem;
	}
`;
const InnerContainer = styled.div`
	width: 100%;
	position: relative;
`;

const SliderContainer = styled.div`
	width: 100%;
	position: relative;

	& .flickity-cell {
		width: 100%;
	}

	& img {
		width: 100%;
		max-width: 100%;
		height: auto;
	}

	& p {
		max-width: 75%;
		padding: 2rem 0 0 0rem;
		color: var(--pearl);
	}
	@media only screen and (max-width: 600px) {
		& p {
			max-width: 65%;
		}
	}
`;

const BottomContainer = styled.div`
	position: absolute;
	bottom: 0;
	right: 5rem;
	@media only screen and (max-width: 1200px) {
		& {
			bottom: 1rem;
		}
	}
	@media only screen and (max-width: 820px) {
		& {
			right: 2rem;
		}
	}
	@media only screen and (max-width: 700px) {
		& {
			right: 0rem;
		}
	}
	@media only screen and (max-width: 600px) {
		& {
			bottom: 2rem;
		}
	}
`;

const NavigationContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 3rem;

	& img {
		width: 50px;
		max-width: 50px;
		height: auto;
		cursor: pointer;
	}

	@media only screen and (max-width: 1680px) {
		& img {
			width: 30px;
			max-width: 30px;
		}
	}
	@media only screen and (max-width: 600px) {
		& {
			gap: 2rem;
		}
	}
`;

export const SingleColumnSliderQueryFragment = `
    ... on Page_Flexiblecontent_Sections_SingleColumnSlider {
          anchor
          captionPlacement
          fieldGroupName
          hideComponent
          sliderItems {
            caption
            image {
              altText
              mediaItemUrl
            }
          }
        }
`;

export default function SingleColumnSlider(props) {
	const { anchor, captionPlacement, sliderItems } = props;
	const [currentCaption, setCurrentCaption] = useState(1);
	const slider = useRef(null);
	return (
		<SingleColumnSliderSection>
			{anchor && <a id={anchor} className="anchor" name={anchor}></a>}
			<InnerContainer data-animate="fadeInUp">
				<SliderContainer>
					<Flickity
						options={{
							cellAlign: "center",
							prevNextButtons: true,
							pageDots: false,
							prevNextButtons: false,
							draggable: true,
							wrapAround: true
						}}
						disableImagesLoaded={false} // default false
						reloadOnUpdate={false} // default false
						static // default false
						flickityRef={(c) => {
							slider.current = c;
						}}>
						{sliderItems.map((item, index) => {
							return (
								<div key={`scs-${index}`}>
									<Image
										src={item.image.mediaItemUrl}
										alt={item.image.altText}
										width={1140}
										height={650}
									/>
									<p>{item.caption}</p>
								</div>
							);
						})}
					</Flickity>
				</SliderContainer>
				<BottomContainer>
					<NavigationContainer>
						<Image
							src="https://cms.parkelmcenturyplaza.com/wp-content/uploads/2023/10/Left-Arrow.svg"
							alt="left arrow"
							width={24}
							height={11}
							onClick={() => slider.current.previous()}
						/>

						<Image
							src="https://cms.parkelmcenturyplaza.com/wp-content/uploads/2023/10/Right-Arrow.svg"
							alt="right arrow"
							width={24}
							height={11}
							onClick={() => slider.current.next()}
						/>
					</NavigationContainer>
				</BottomContainer>
			</InnerContainer>
		</SingleColumnSliderSection>
	);
}
