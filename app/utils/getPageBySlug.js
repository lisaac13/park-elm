import HeroQueryFragment from "../components/Hero";
import FullWidthBackgroundImageQueryFragment from "../components/FullWidthBackgroundImage";
import TwoColumnTextContentQueryFragment from "../components/TwoColumnTextContent";
import TwoColumnMediaContentQueryFragment from "../components/TwoColumnMediaContent";
import TwoColumnContentSliderQueryFragment from "../components/TwoColumnContentSlider";
import SingleColumnSliderQueryFragment from "../components/SingleColumnSlider";
import ContentTimlineQueryFragment from "../components/ContentTimline";
import FormQueryFragment from "../components/Forms";

async function getPageBySlug(pathname) {
	const res = await fetch(process.env.API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
	            query AllSectionsPerPage {
	                page(id: "${pathname}", idType: URI) {
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
          videoWebm {
            mediaItemUrl
          }
        }
        ... on Page_Flexiblecontent_Sections_FullWidthBackgroundImage {
          fieldGroupName
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
	                        }
	                    }
	                }
	            }
	        `,
		}),
	});

	const data = await res.json();

	const pageData = data.data.page;

	return pageData;
}

export default getPageBySlug;
