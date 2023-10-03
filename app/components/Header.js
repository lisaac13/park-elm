"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

import Logo from "/public/next.svg";

const HeaderContainer = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export default function Header() {
	return (
		<HeaderContainer>
			<Link href="/">### ### ####</Link>
			<Image src={Logo} width="100" height="50" alt="### ### ####" />
			<Link href="/">Inquire</Link>
		</HeaderContainer>
	);
}
