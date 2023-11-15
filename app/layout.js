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
				<meta
					name="google-site-verification"
					content="lFjtLXr4ydz1JFnvQDVhmdOsBdUDkXLxegro0vltDo8"
				/>
			</Head>
			<Script id="fb-pixel">
				{`!function(f,b,e,v,n,t,s)
					{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
					n.callMethod.apply(n,arguments):n.queue.push(arguments)};
					if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
					n.queue=[];t=b.createElement(e);t.async=!0;
					t.src=v;s=b.getElementsByTagName(e)[0];
					s.parentNode.insertBefore(t,s)}(window, document,'script',
					'https://connect.facebook.net/en_US/fbevents.js');
					fbq('init', '735360295307560');
					fbq('track', 'PageView');`}
			</Script>
			<noscript>
				<img
					height="1"
					width="1"
					style={{ display: "none" }}
					src="https://www.facebook.com/tr?id=735360295307560&ev=PageView&noscript=1"
				/>
			</noscript>
			<Script src="https://www.googletagmanager.com/gtag/js?id=G-SM79XXQQQX" />
			<Script id="wicked-ga4">
				{`window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-SM79XXQQQX');`}
			</Script>
			<StyledComponentsRegistry>
				<body ref={main}>
					<Script id="clickcease">
						{`var script = document.createElement('script');
      			script.async = true; script.type = 'text/javascript';
      			var target = 'https://www.clickcease.com/monitor/stat.js';
      			script.src = target;var elem = document.head;elem.appendChild(script);`}
					</Script>
					<noscript>
						<a href="https://www.clickcease.com" rel="nofollow">
							<img
								src="https://monitor.clickcease.com"
								alt="ClickCease"
							/>
						</a>
					</noscript>
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
