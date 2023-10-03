"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import Flickity from "react-flickity-component";
import styled from "styled-components";

const TwoColumnContentSliderSection = styled.section``;
const InnerContainer = styled.div``;
const ContentContainer = styled.div``;
const Title = styled.h2``;
const Subtitle = styled.p``;
const Content = styled.p``;
const ImageContainer = styled.div``;

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
          }
        }
`;

export default function TwoColumnContentSlider(props) {
	const { anchor, content, title, subtitle, images } = props;
	const slider = useRef(null);
	return (
		<TwoColumnContentSliderSection>
			<InnerContainer>
				<ContentContainer>
					<Title>{title}</Title>
					<Subtitle>{subtitle}</Subtitle>
					<Content>{content}</Content>
				</ContentContainer>
				<ImageContainer>
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
						{images.map((image, index) => (
							<Image
								key={`tccs-images-${index}`}
								src={image.mediaItemUrl}
								alt={image.altText}
								width={519}
								height={413}
								style={{ width: "100%", height: "100%" }}
							/>
						))}
					</Flickity>
				</ImageContainer>
			</InnerContainer>
		</TwoColumnContentSliderSection>
	);
}
