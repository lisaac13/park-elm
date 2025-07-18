"use client";
import Script from "next/script";

export default function TrackingScripts() {
    return (
      <>
<Script id="fb-pixel" strategy="beforeInteractive">
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
			<Script src="https://www.googletagmanager.com/gtag/js?id=G-SM79XXQQQX" strategy="beforeInteractive"/>
			<Script id="wicked-ga4" strategy="beforeInteractive">
				{`window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-SM79XXQQQX');`}
			</Script>
            </>
    );
}