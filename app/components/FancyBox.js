import { useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox/fancybox.umd.js";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function Fancybox(props) {
	const delegate = props.delegate || "[data-fancybox]";

	useEffect(() => {
		const opts = props.options || {
			Toolbar: {
				display: {
					left: [],
					middle: [],
					right: ["close"],
				},
			},
		};

		NativeFancybox.bind(delegate, opts);

		return () => {
			NativeFancybox.destroy();
		};
	});

	return <>{props.children}</>;
}

export default Fancybox;
