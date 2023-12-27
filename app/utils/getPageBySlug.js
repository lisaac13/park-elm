import HeroQueryFragment from "../components/Hero";
import FullWidthBackgroundImageQueryFragment from "../components/FullWidthBackgroundImage";
import TwoColumnTextContentQueryFragment from "../components/TwoColumnTextContent";
import TwoColumnMediaContentQueryFragment from "../components/TwoColumnMediaContent";
import TwoColumnContentSliderQueryFragment from "../components/TwoColumnContentSlider";
import SingleColumnSliderQueryFragment from "../components/SingleColumnSlider";
import ImageContentBlocksThreeUpQueryFragment from "../components/ImageContentBlocksThreeUp";
import ContentTimlineQueryFragment from "../components/ContentTimline";
import FormQueryFragment from "../components/Forms";
import ContentBlockQueryFragment from "../components/ContentBlock";
import GatedContentkQueryFragment from "../components/GatedContent";
import FullWidthImageWithOverlayQueryFragment from "../components/FullWidthImageWithOverlay";

async function getPageBySlug(pathname, metaDataOnly) {
	const res = await fetch(process.env.API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
	            query AllSectionsPerPage {
                page(id: "${pathname}", idType: URI) {
                  seo {
                    metaDesc
                    title
                    fullHead
                  }
                  flexibleContent {
                    sections {
                      ... on Page_Flexiblecontent_Sections_TwoColumnTitleContent {
                        anchor
                        content
                        fieldGroupName
                        hideComponent
                        subtitle
                        title
                      }
                      ... on Page_Flexiblecontent_Sections_Availability {
                        anchor
                        fieldGroupName
                        hideComponent
                        heading
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
                      ... on Page_Flexiblecontent_Sections_TwoColumnMediaContent {
                        anchor
                        content
                        fieldGroupName
                        hideComponent
                        subtitle
                        title
                        videoWebm {
                          mediaItemUrl
                        }
                        videoMp4 {
                          mediaItemUrl
                        }
                        imagePoster {
                          altText
                          mediaItemUrl
                        }
                      }
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
                      ... on Page_Flexiblecontent_Sections_GatedContent {
                        fieldGroupName
                        hideComponent
                        heading
                        subheading
                        subjectLine
                      }
                      ... on Page_Flexiblecontent_Sections_ContentBlock {
                        anchor
                        content
                        hideComponent
                        fieldGroupName
                      }
                      ... on Page_Flexiblecontent_Sections_FullWidthImageWithOverlay {
                        anchor
                        content
                        hideComponent
                        fieldGroupName
                        imagePoster {
                          altText
                          mediaItemUrl
                        }
                      }
                      ... on Page_Flexiblecontent_Sections_ImageContentBlocksThreeUp {
                        hideComponent
                        fieldGroupName
                        heading
                        anchor
                        paddingOptions
                        contentBlocks {
                          ... on Page_Flexiblecontent_Sections_ImageContentBlocksThreeUp_contentBlocks {
                            title
                            linkType
                            link
                            image {
                              mediaItemUrl
                                altText
                                mediaDetails {
                                  height
                                  width
                                }
                            }
                          }
                        }
                      }
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
                      ... on Page_Flexiblecontent_Sections_Map {
                        anchor
                        content
                        backgroundImage {
                          altText
                          mediaItemUrl
                        }
                        subtitle
                        title
                        hideComponent
                        fieldGroupName
                        destinations {
                          time
                          title
                        }
                        mapImage {
                          altText
                          mediaItemUrl
                        }
                      }
                      ... on Page_Flexiblecontent_Sections_Hero {
                        anchor
                        fieldGroupName
                        hideComponent
                        mediaType
                        height
                        imagePoster {
                          mediaItemUrl
                        }
                        videoMp4 {
                          mediaItemUrl
                        }
                        videoWebm {
                          mediaItemUrl
                        }
                      }
                      ... on Page_Flexiblecontent_Sections_FullWidthBackgroundImage {
                        fieldGroupName
                        hideComponent
                        anchor
                        imagePoster {
                          mediaItemUrl
                        }
                      }
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
                      ... on Page_Flexiblecontent_Sections_SingleColumnForm {
                        anchor
                        content
                        fieldGroupName
                        formToUse
                        hideComponent
                        title
                      }
                      ... on Page_Flexiblecontent_Sections_Gallery {
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
                    }
                  }
                }
              }
            `,
		}),
	});

	const data = await res.json();

	const pageData = metaDataOnly ? data.data.page.seo : data.data.page;

	return pageData;
}

export default getPageBySlug;
