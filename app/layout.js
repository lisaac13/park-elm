import "./globals.css";
import StyledComponentsRegistry from "../lib/registry";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/app/components/Header"), {
	ssr: false,
});

const Footer = dynamic(() => import("@/app/components/Footer"), {
	ssr: false,
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<StyledComponentsRegistry>
				<body>
					<Header />
					<main>{children}</main>
					<Footer />
				</body>
			</StyledComponentsRegistry>
		</html>
	);
}
