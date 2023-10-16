import Hero from "../components/Hero";
import Map from "../components/Map";
import TwoColumnTextContent from "../components/TwoColumnTextContent";
import TwoColumnMediaContent from "../components/TwoColumnMediaContent";
import TwoColumnContentSlider from "../components/TwoColumnContentSlider";
import ContentBlock from "../components/ContentBlock";
import ImageContentBlocksThreeUp from "../components/ImageContentBlocksThreeUp";
import SingleColumnSlider from "../components/SingleColumnSlider";
import FullWidthBackgroundImage from "../components/FullWidthBackgroundImage";
import ContentTimline from "../components/ContentTimline";
import Forms from "../components/Forms";
import FullWidthImageWithOverlay from "../components/FullWidthImageWithOverlay";

export default function parseSections(sections) {
	const gatheredSections = [];
	for (const [index, section] of sections.entries()) {
		if (section.hideComponent == true) continue;

		const componentKey = `section-${index}`;

		switch (section.fieldGroupName) {
			case "Page_Flexiblecontent_Sections_Hero":
				gatheredSections.push(
					<Hero key={componentKey} {...section} index={index} />
				);
				break;
			case "Page_Flexiblecontent_Sections_ContentTimeline":
				gatheredSections.push(
					<ContentTimline
						key={componentKey}
						{...section}
						index={index}
					/>
				);
				break;
			case "Page_Flexiblecontent_Sections_ContentBlock":
				gatheredSections.push(
					<ContentBlock
						key={componentKey}
						{...section}
						index={index}
					/>
				);
				break;
			case "Page_Flexiblecontent_Sections_ImageContentBlocksThreeUp":
				gatheredSections.push(
					<ImageContentBlocksThreeUp
						key={componentKey}
						{...section}
						index={index}
					/>
				);
				break;
			case "Page_Flexiblecontent_Sections_FullWidthImageWithOverlay":
				gatheredSections.push(
					<FullWidthImageWithOverlay
						key={componentKey}
						{...section}
						index={index}
					/>
				);
				break;
			case "Page_Flexiblecontent_Sections_SingleColumnForm":
				gatheredSections.push(
					<Forms key={componentKey} {...section} index={index} />
				);
				break;
			case "Page_Flexiblecontent_Sections_FullWidthBackgroundImage":
				gatheredSections.push(
					<FullWidthBackgroundImage
						key={componentKey}
						{...section}
						index={index}
					/>
				);
				break;
			case "Page_Flexiblecontent_Sections_SingleColumnSlider":
				gatheredSections.push(
					<SingleColumnSlider
						key={componentKey}
						{...section}
						index={index}
					/>
				);
				break;
			case "Page_Flexiblecontent_Sections_TwoColumnContentSlider":
				gatheredSections.push(
					<TwoColumnContentSlider
						key={componentKey}
						{...section}
						index={index}
					/>
				);
				break;
			case "Page_Flexiblecontent_Sections_TwoColumnMediaContent":
				gatheredSections.push(
					<TwoColumnMediaContent
						key={componentKey}
						{...section}
						index={index}
					/>
				);
				break;
			case "Page_Flexiblecontent_Sections_Map":
				gatheredSections.push(
					<Map key={componentKey} {...section} index={index} />
				);
				break;
			case "Page_Flexiblecontent_Sections_TwoColumnTitleContent":
				gatheredSections.push(
					<TwoColumnTextContent
						key={componentKey}
						{...section}
						index={index}
					/>
				);
				break;
			default:
				break;
		}
	}
	return gatheredSections;
}
