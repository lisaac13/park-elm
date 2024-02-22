import parseSections from "../utils/parseSections";
import getPageBySlug from "../utils/getPageBySlug";

export async function generateMetadata(props) {
	const data = await getPageBySlug(props.params.slug[0], true);

	return {
		title: data?.title,
		description: data?.metaDesc,
	};
}

export default async function Page(props) {
	const data = await getPageBySlug(props.params.slug[0], false);

	return <>{parseSections(data?.flexibleContent.sections)}</>;
}
