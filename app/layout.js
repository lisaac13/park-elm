import "./globals.css";
import StyledComponentsRegistry from "../lib/registry";
import dynamic from "next/dynamic";
import Script from "next/script";

const Header = dynamic(() => import("@/app/components/Header"), {
	ssr: false,
});

const Footer = dynamic(() => import("@/app/components/Footer"), {
	ssr: false,
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Script src="https://www.googletagmanager.com/gtag/js?id=G-SM79XXQQQX" />
			<Script id="wicked-ga4">
				{`window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-SM79XXQQQX');`}
			</Script>
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
