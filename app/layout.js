"use client";
import "./globals.css";
import { useLayoutEffect, useRef, useEffect } from "react";
import StyledComponentsRegistry from "../lib/registry";
import dynamic from "next/dynamic";
import Script from "next/script";
import Head from "next/head";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { usePathname } from "next/navigation";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

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
			const pageFade = self.selector("[data-page]");
			var tl = gsap.timeline();
			tl.fromTo(
				pageFade,
				{ autoAlpha: 0, duration: 0.5 },
				{ autoAlpha: 1, duration: 1 }
			);
		}, main); // <- Scope!
		return () => ctx.revert(); // <- Cleanup!
	}, []);

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
						},
					}
				);
			});
		}, main);
		return () => ctx.revert();
	}, []);

	return (
		<html lang="en">
			<Head>
				<meta
					property="og:image"
					content="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/11/C88A2126-Edit-scaled.jpg"
				/>
			</Head>
			<Script src="https://www.googletagmanager.com/gtag/js?id=G-SM79XXQQQX" />
			<Script id="wicked-ga4">
				{`window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-SM79XXQQQX');`}
			</Script>
			<StyledComponentsRegistry>
				<body ref={main}>
					<div data-page={pathname}>
						<Header />
						<main>{children}</main>
						<Footer />
					</div>
				</body>
			</StyledComponentsRegistry>
		</html>
	);
}
