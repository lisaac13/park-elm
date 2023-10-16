import Image from "next/image";
import parseSections from "../utils/parseSections";
import getPageBySlug from "../utils/getPageBySlug";

export default async function Page(props) {
	const data = await getPageBySlug(props.params.slug[0]);

	return <>{parseSections(data.flexibleContent.sections)}</>;
}
