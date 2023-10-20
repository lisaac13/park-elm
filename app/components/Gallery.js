"use client";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Fancybox from "./FancyBox.js";
import styled from "styled-components";
// import Title from "../typography/Title";
// import BodyCopy from "../typography/BodyCopy";
import Link from "next/link";

const MasonaryGallerySection = styled.section`
	padding: ${(props) => (props.index === 0 ? "9rem 0" : "6rem 0")};
	max-width: 90vw;
	margin: 0 auto;
`;

export const MasonaryGalleryQueryFragment = `
    ... on Page_Sections_Sections_Gallery {
          anchor
          content
          ctaLink
          ctaText
          hideComponent
          fieldGroupName
          title
          images {
            altText
            mediaItemUrl
          }
        }
`;

export default function Gallery(props) {
	const { anchor, title, content, ctaText, ctaLink, images, index } = props;

	if (!images) return null;

	return (
		<MasonaryGallerySection index={index}>
			{anchor ? <a id={anchor} className="anchor"></a> : null}
			{/* {title ? (
				<Title
					size="heading"
					font="serif"
					align="center"
					mb={content || ctaText & ctaLink ? "1rem" : "3rem"}>
					{title}
				</Title>
			) : null} */}
			{/* {content ? (
				<BodyCopy
					font="sansserif"
					mw="80vw"
					margin="0 auto"
					align="center">
					{content}
				</BodyCopy>
			) : null} */}
			{ctaLink && ctaText ? (
				<Link
					href={ctaLink}
					className="tertiary-btn"
					style={{
						margin: "1rem auto 3rem",
						width: "fit-content",
						display: "block",
					}}>
					{ctaText}
				</Link>
			) : null}
			<ResponsiveMasonry
				columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
				<Masonry columnsCount={3} gutter="1rem">
					{images.map((image, index) => (
						<Fancybox key={`fancy-${index}`}>
							<div
								key={`img-${index}`}
								data-fancybox="gallery"
								href={image.mediaItemUrl}>
								<img
									key={index}
									src={image.mediaItemUrl}
									alt={image.altText}
									// width={image.mediaDetails.width}
									// height={image.mediaDetails.height}
									style={{ width: "100%", display: "block" }}
								/>
							</div>
						</Fancybox>
					))}
				</Masonry>
			</ResponsiveMasonry>
		</MasonaryGallerySection>
	);
}
