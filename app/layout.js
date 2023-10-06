"use client";
import "./globals.css";
import { useLayoutEffect, useRef } from "react";
import StyledComponentsRegistry from "../lib/registry";
import dynamic from "next/dynamic";
import Script from "next/script";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
gsap.registerPlugin(ScrollTrigger);

const Header = dynamic(() => import("@/app/components/Header"), {
	ssr: false,
});

const Footer = dynamic(() => import("@/app/components/Footer"), {
	ssr: false,
});

export default function RootLayout({ children }) {
	const main = useRef();
	const pathname = usePathname();

	useLayoutEffect(() => {
		const ctx = gsap.context((self) => {
			const reveals = self.selector('[data-animate="fadeInUp"]');

			reveals.forEach((reveal) => {
				gsap.fromTo(
					reveal,
					{ autoAlpha: 0, y: 50 },
					{
						autoAlpha: 1,
						y: 0,
						scrollTrigger: {
							trigger: reveal,
							start: "top bottom",
							endTrigger: reveal,
							end: "bottom center",
							markers: false,
							toggleActions: "play none none reverse",
							refreshPriority: -1,
						},
					}
				);
			});
		}, main);
		return () => ctx.revert();
	}, []);

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
					<main ref={main} data-page={pathname}>
						{children}
					</main>
					<Footer />
				</body>
			</StyledComponentsRegistry>
		</html>
	);
}
