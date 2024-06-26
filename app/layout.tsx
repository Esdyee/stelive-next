import './globals.css'
import {Inter} from 'next/font/google'
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {cookies} from "next/headers";
import NextProvider from "./NextProvider";
import Link from "next/link";
import DarkMode from "@/app/DarkMode";
// import '@nextui-org/react/dist/nextui.css'; // 예시 경로

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    // @ts-ignore
    const session = await getServerSession(authOptions);

    let darkMode = cookies().get("darkMode");
    console.log("darkmode###", darkMode)

    return (
        <html lang="en">
        <body className={`
            ${inter.className} 
            ${darkMode?.value === "true" ? "dark-mode" : ""}
        `}>
        <div className="navbar">
            <Link href="/" className="navbar-item">홈</Link>
            <span>|</span>
            <Link href="/list" className="navbar-item">리스트</Link>
            <span>|</span>
            <Link href="/write" className="navbar-item">작성</Link>
            <span>|</span>
            <Link href="/signup" className="navbar-item">가입</Link>
            <span>|</span>
            <Link href="/introduce" className="navbar-item">소개</Link>
            {/*<LoginBtn session={session} />*/}
            <DarkMode/>
        </div>
        <NextProvider>
            {children}
        </NextProvider>
        </body>
        </html>
    )
}
