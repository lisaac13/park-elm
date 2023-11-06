import Head from "next/head";
import getPageBySlug from "./utils/getPageBySlug";
import parseSections from "./utils/parseSections";

export const metadata = {
	metadataBase: new URL("https://parkelmcenturyplaza.com"),
	// metadataBase: new URL("https://localhost:3000"),
	title: "Park Elm at Century Plaza",
	description:
		"Park Elm at Century Plaza strikes the perfect architectural balance — offering utmost privacy and unimpeded views of the ocean, hills and skyline. With lavish lifestyle and wellness amenities, the iconic Century Plaza at its base, and Beverly Hills moments away, Park Elm is LA’s new beacon of luxury living.",
};

export default async function Page(props) {
	const data = await getPageBySlug("home");

	return <>{parseSections(data.flexibleContent.sections)}</>;
}
