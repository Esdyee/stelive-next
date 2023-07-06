import './globals.css'
import { Inter } from 'next/font/google'
import Link from "next/link";
import LoginBtn from "@/app/LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default async function RootLayout({
   children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions);
	console.log(session);
	return (
		<html lang="en">
		<body className={inter.className}>
		<div className="navbar">
			<Link href="/" className="navbar-item">홈</Link>
			<span>|</span>
			<Link href="/list" className="navbar-item">리스트</Link>
			<span>|</span>
			<Link href="/write" className="navbar-item">작성</Link>
			<span>|</span>
			<Link href="/signup" className="navbar-item">가입</Link>
			<LoginBtn session={session} />
		</div>
		<div className="bg-neutral-800 text-white body-content">
			{children}
		</div>
		</body>
		</html>
	)
}
