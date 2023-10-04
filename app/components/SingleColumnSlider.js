"use client";
import Flickity from "react-flickity-component";
import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const SingleColumnSliderSection = styled.section``;
const InnerContainer = styled.div``;
const SliderContainer = styled.div``;

const BottomContainer = styled.div``;
const Caption = styled.div``;
const NavigationContainer = styled.div``;

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
			{anchor && <a id={anchor}></a>}
			<InnerContainer>
				<SliderContainer>
					<Flickity
						options={{
							cellAlign: "center",
							prevNextButtons: true,
							pageDots: false,
							prevNextButtons: false,
							draggable: true,
							wrapAround: true,
							selectedAttraction: 0.01,
							friction: 0.2,
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
										width={200}
										height={200}
									/>
								</div>
							);
						})}
					</Flickity>
				</SliderContainer>
				<BottomContainer>
					<Caption type={captionPlacement}></Caption>
					<NavigationContainer></NavigationContainer>
				</BottomContainer>
			</InnerContainer>
		</SingleColumnSliderSection>
	);
}
