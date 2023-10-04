import Image from "next/image";
import parseSections from "../utils/parseSections";

export async function generateStaticParams() {
	const posts = await fetch(process.env.APP_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
				query AllSectionsPerPage {
					page
				}
			`,
		}),
	}).then((res) => res.json());

	console.log(posts);

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export default function Home(props) {
	console.log("yurr");

	return <>here</>;
}
