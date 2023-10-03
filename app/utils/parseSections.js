import Hero from "@/components/Hero";
import Map from "@/components/Map";
import TwoColumnTextContent from "@/components/TwoColumnTextContent";
import TwoColumnMediaContent from "@/components/TwoColumnMediaContent";
import TwoColumnContentSlider from "@/components/TwoColumnContentSlider";

export default function parseSections(sections) {
	for (const [index, section] of sections.entries()) {
		if (section.hideComponent == true) continue;

		const componentKey = `section-${index}`;

		switch (section.fieldGroupName) {
			case "Page_Sections_Sections_Hero":
				gatheredSections.push(
					<Hero key={componentKey} {...section} index={index} />
				);
				break;
			default:
				break;
		}
	}
	return gatheredSections;
}
