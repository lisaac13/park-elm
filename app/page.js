import getPageBySlug from "./utils/getPageBySlug";
import parseSections from "./utils/parseSections";

export default async function Page(props) {
	const data = await getPageBySlug("home");

	return <>{parseSections(data.flexibleContent.sections)}</>;
}
