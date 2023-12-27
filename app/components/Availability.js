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
    
    &.paddingpage {padding: 12rem 6rem 6rem 6rem;}
    @media screen and (max-width: 820px) {
        &.paddingpage {padding: 12rem 4rem 6rem 4rem;}
    }
    @media screen and (max-width: 600px) {
        &.paddingpage {padding: 12rem 2rem 6rem 2rem;}
    }
`;
const AvailabilityContent = styled.div`
    width: 100%;
    max-width: 600px;
    margin: auto; 
    text-align: center;
    display: block;
    padding: 0 0 6rem 0;

   & h1 {
        font-size: var(--heading);
        padding: 0 0 2rem 0;
        color: var(--rose);
        font-family: var(--font-serif-medium);
        text-align: center;
        font-weight: 500;
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

const ResidenceContainer = styled.div`
    width: 100%;
    padding: 0 0 4rem 0;
& h2 {
    color: var(--rose);
    font-family: var(--font-serif-medium);
    font-size: var(--smallheading);
    font-weight: 500;
}
`;

const Heading = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    border-bottom: 1px solid var(--sky);
    padding: 1rem 0;
    & li {
        width: calc(16.66% - 1rem);
        font-family: var(--font-sans-serif);
        text-transform: uppercase;
        font-weight: 400;
        font-size: var(--body);
        color: var(--black);
    }
    & li.center {  
        text-align: center;
    }
    & li.left {  
        text-align: left;
    }
    & li.right {  
        text-align: right;
    }
`;
const SingleResidence = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--sky);
    & li {
        width: calc(16.66% - 1rem);
    }
    & li.heading {
        font-family: var(--font-serif-medium);
        text-transform: uppercase;
        font-weight: 500;
        font-size: var(--smallheading);
        color: var(--rose);
    }
    & li.reg {
        font-family: var(--font-sans-serif);
        text-transform: uppercase;
        font-weight: 400;
        font-size: var(--body);
        color: var(--black);
    }
    & li.center {  
        text-align: center;
    }
    & li.left {  
        text-align: left;
    }
    & li.right {  
        text-align: right;
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
                            <li className="left">Residence</li>
                            <li className="center">List Price</li>
                            <li className="center">Bed / Bath</li>
                            <li className="center">SF / SM</li>
                            <li className="center">View Direction</li>
                            <li className="rightr">Additional Information</li>
                        </Heading>
                        {item?.residences?.map((single, index) => {
                            return (
                            <SingleResidence key={`single-${index}`}>
                            <li className="heading left">{single?.singleResidences?.residence}</li>
                            <li className="reg center">{single?.singleResidences?.price}</li>
                            <li className="reg center">{single?.singleResidences?.bedrooms} / {single?.singleResidences?.bathrooms}</li>
                            <li className="reg center">{single?.singleResidences?.squareFeet} / {single?.singleResidences?.squareMeters}</li>
                            <li className="reg center">{single?.singleResidences?.viewDirection}</li>
                            <li className="reg right">{single?.singleResidences?.floorPlan && <span>Floor Plan</span>}{single?.singleResidences?.videoEmbed && <span>Video</span>}</li>
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
