"use client";
import styled from "styled-components";
import Image from "next/image";

const FullWidthImagewithOverlay = styled.section`
    padding: 6rem 4rem 8rem 4rem;
    width: 100%;
    height: auto;
    position: relative;
    display: block;
    z-index: 0;
    background: var(--rose);

    @media only screen and (max-width: 700px) {
        padding: 6rem 2rem 8rem 2rem;
    }
    @media only screen and (max-width: 820px) {
        padding: 6rem 4rem 6rem 4rem;
    }
    @media only screen and (max-width: 700px) {
        padding: 6rem 2rem 6rem 2rem;
    }
`;

const BackgroundGradient = styled.div`
position: absolute;
top: 0;
left: 0;
right: 0;
height: 50%;
z-index: 1;
background: rgb(247,247,245);
background: -moz-linear-gradient(180deg, rgba(247,247,245,1) 35%, rgba(164,136,119,1) 100%);
background: -webkit-linear-gradient(180deg, rgba(247,247,245,1) 35%, rgba(164,136,119,1) 100%);
background: linear-gradient(180deg, rgba(247,247,245,1) 35%, rgba(164,136,119,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#f7f7f5",endColorstr="#a48877",GradientType=1);
`;

const ImageContainer = styled.div`
    width: 100%;
    position: relative;
    z-index: 2;
    display: block;

    & img {
        width: 100%;
        max-width: 100%;
        height: auto;
    }
`;
const ContentContainer = styled.div`
    position: absolute;
    left: 6rem;
    bottom: -3rem;
    z-index: 3;

    & p {
        max-width: 40%;
        color: var(--pearl);
        font-size: var(--quote);
        font-family: var(--font-serif-med-italic);
        line-height: 1.3;
    }
    @media only screen and (max-width: 1680px) {
        & p {
            max-width: 440px;
        }
    }
    @media only screen and (max-width: 900px) {
        & {left: 4rem;}
    }
    @media only screen and (max-width: 820px) {
        & {position: relative; 
            bottom: unset; 
            left: unset; 
            top: unset;
            margin: -3rem 0 0 2rem;
        }
    }
    @media only screen and (max-width: 600px) {
        & p{max-width: 80%;}
    }
`;
export const FullWidthImageWithOverlayQueryFragment = `
    ... on Page_Flexiblecontent_Sections_FullWidthImageWithOverlay {
          anchor
          fieldGroupName
          hideComponent
          content
          imagePoster {
            altText
            mediaItemUrl
          }
        }
`;

export default function FullWidthImageWithOverlay(props) {
    const { anchor, content, imagePoster } = props;
    return (
    <FullWidthImagewithOverlay>
        <ImageContainer className="mm_reveal">
        <Image
        src={imagePoster.mediaItemUrl}
        alt={imagePoster.altText}
        width={1140}
        height={650}/>
        <ContentContainer>
            <p>{content}</p>
        </ContentContainer>
        </ImageContainer>
        <BackgroundGradient></BackgroundGradient>
    </FullWidthImagewithOverlay>
    )
}