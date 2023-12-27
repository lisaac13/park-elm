"use client";
import "./globals.css";
import { useContext, useLayoutEffect, useRef, useEffect, useState } from "react";
import StyledComponentsRegistry from "../lib/registry";
import dynamic from "next/dynamic";
import Script from "next/script";
import Head from "next/head";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useIsomorphicLayoutEffect } from '@/lib/helpers/isomorphicEffect';
import TransitionContext from '@/lib/context/TransitionContext';
import { TransitionProvider } from "@/lib/context/TransitionContext";
import TransitionComponent from "@/app/components/Transition";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Header = dynamic(() => import("@/app/components/Header"), {
	ssr: false,
});

const Footer = dynamic(() => import("@/app/components/Footer"), {
	ssr: false,
});

export default function RootLayout({ children }) {
	const main = useRef();
	const pathname = usePathname();
	const scrollTween = useRef();
  	const [ctx] = useState(gsap.context(() => {}, main));
  	const { completed } = useContext(TransitionContext);

	  const goToSection = (i) => {
		// Remove the GSAP instance with the specific ID
		// to prevent memory leak
		ctx.data.forEach((e) => {
		  if (e.vars && e.vars.id === 'scrollTween') {
			e.kill();
		  }
		});
		ctx.add(() => {
		  scrollTween.current = gsap.to(window, {
			scrollTo: { y: i * window.innerHeight, autoKill: false },
			duration: 1,
			id: 'scrollTween',
			onComplete: () => (scrollTween.current = null),
			overwrite: true,
		  });
		});
	  };
	
	  useIsomorphicLayoutEffect(() => {
		if (!completed) return;
		ctx.add(() => {
		  const panels = gsap.utils.toArray('.panel');
		  panels.forEach((panel, i) => {
			ScrollTrigger.create({
			  trigger: panel,
			  start: 'top bottom',
			  end: '+=200%',
			  onToggle: (self) =>
				self.isActive && !scrollTween.current && goToSection(i),
			});
		  });
		  ScrollTrigger.create({
			start: 0,
			end: 'max',
			snap: 1 / (panels.length - 1),
		  });
		});
		return () => ctx.revert();
	  }, [completed]);

	return (
		<html lang="en">
			<Head>
				<meta
					property="og:image"
					content="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2023/11/C88A2126-Edit-scaled.jpg"
				/>
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
			</Head>
			<StyledComponentsRegistry>
				<body data-page={pathname}>
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
						<Header />
						<TransitionProvider>
						<TransitionComponent>
							<main ref={main} className="panel">
								{children}
							</main>
						</TransitionComponent>
						</TransitionProvider>
						<Footer />
				</body>
			</StyledComponentsRegistry>
		</html>
	);
}
