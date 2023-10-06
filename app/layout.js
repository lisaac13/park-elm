"use client";
import "./globals.css";
import { useLayoutEffect, useRef } from "react";
import StyledComponentsRegistry from "../lib/registry";
import dynamic from "next/dynamic";
import Script from "next/script";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Header = dynamic(() => import("@/app/components/Header"), {
	ssr: false,
});

const Footer = dynamic(() => import("@/app/components/Footer"), {
	ssr: false,
});

export default function RootLayout({ children }) {
	const main = useRef();

	useLayoutEffect(() => {
		const ctx = gsap.context((self) => {
		const reveals = self.selector('.mm_reveal');

		reveals.forEach((section) => {
			gsap.fromTo(
				section,
				{ autoAlpha: 0, y: 50 },
				{
					autoAlpha: 1,
					y: 0,
					scrollTrigger: {
						trigger: section,
						start: "top bottom",
						markers: false,
						toggleActions: "play none none reverse"
					},
				}
				)
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
				<body ref={main}>
					<Header />
					<main>{children}</main>
					<Footer />
				</body>
			</StyledComponentsRegistry>
		</html>
	);
}
