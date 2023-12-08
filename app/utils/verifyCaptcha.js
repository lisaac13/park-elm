"use server";
export const verifyCaptcha = async (verifyToken) => {
	const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
		method: "POST",
		body: `secret=${process.env.NEXT_RECAPTCHA_SECRET_KEY}&response=${verifyToken}`,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});

	const data = await res.json();

	return data;
};
