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
import TrackingScripts from "@/app/components/TrackingScripts";
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
					content="https://parkelmcms.wpenginepowered.com/wp-content/uploads/2024/01/park-elm-at-century-plaza-open-graph-image.jpg"
				/>
				<TrackingScripts/>
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
