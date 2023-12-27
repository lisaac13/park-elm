"use client";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import Script from "next/script";

const Availabilityrapper = styled.section`
    width: 100%;
    margin: auto;
    display: block;
    
    &.paddingpage {padding: 10rem 6rem 6rem 6rem;}
    @media screen and (max-width: 820px) {
        &.paddingpage {padding: 10rem 4rem 6rem 4rem;}
    }
    @media screen and (max-width: 600px) {
        &.paddingpage {padding: 10rem 2rem 6rem 2rem;}
    }
`;
const AvailabilityContent = styled.div`
    width: 100%;
    max-width: 600px;
    margin: auto; 
    text-align: center;
    display: block;

   & h1 {
        font-size: var(--heading);
        padding: 0 0 2rem 0;
        color: var(--rose);
        font-family: var(--font-serif-medium);
        text-align: center;
    }
    & p {
        font-family: var(--font-sans-serif);
        line-height: 1.5;
    }
    & p a,
    & p a:visited,
    & p a:focus {
        color: var(--rose);
        text-decoration: underline;
    }
`;

const ResidencesAvailability = styled.div``;

const ResidenceContainer = styled.div``;

const Heading = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    & li {
        width: calc(16.66% - 1rem);
    }
`;
const SingleResidence = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    & li {
        width: calc(16.66% - 1rem);
    }
`;
export const AvailabilityQueryFragment = `
    ... on Page_Flexiblecontent_Sections_Availability {
        hideComponent
        fieldGroupName
        heading
		anchor
        blurb
        paddingOptions
        residencesRepeater {
            title
            fieldGroupName
            residences {
              ... on Residence {
                title
                singleResidences {
                  bedrooms
                  fieldGroupName
                  price
                  residence
                  squareMeters
                  squareFeet
                  viewDirection
                  floorPlan {
                    altText
                    mediaItemUrl
                    mediaDetails {
                      height
                      width
                    }
                  }
                  videoEmbed
                  bathrooms
                }
              }
            }
          }
    }
`;

export default function Availability(props) {
	const {
		hideComponent,
		fieldGroupName,
		anchor,
		heading,
        blurb,
        paddingOptions,
        residencesRepeater,
	} = props;
    return (
        <Availabilityrapper className={paddingOptions}>
            <AvailabilityContent>
                {heading && <h1 className="black">{heading}</h1>}
                {parse(blurb)}
            </AvailabilityContent>
            <ResidencesAvailability>
                {residencesRepeater.map((item, index) => {
                    return (
                        <ResidenceContainer key={index}>
                        {item.title && <h2>{item.title}</h2>}
                        <Heading>
                            <li>Residence</li>
                            <li>List Price</li>
                            <li>Bed / Bath</li>
                            <li>SF / SM</li>
                            <li>View Direction</li>
                            <li>Additional Information</li>
                        </Heading>
                        {item?.residences?.map((single, index) => {
                            return (
                            <SingleResidence key={`single-${index}`}>
                            <li>{single?.singleResidences?.residence}</li>
                            <li>{single?.singleResidences?.price}</li>
                            <li>{single?.singleResidences?.bedrooms} / {single?.singleResidences?.bathrooms}</li>
                            <li>{single?.singleResidences?.squareFeet} / {single?.singleResidences?.squareMeters}</li>
                            <li>{single?.singleResidences?.viewDirection}</li>
                            <li>{single?.singleResidences?.videoEmbed && <span>Video</span>}</li>
                            </SingleResidence>
                            )
                        })}
                        </ResidenceContainer>
                    )
                })}
            </ResidencesAvailability>
        </Availabilityrapper>
    )
}
