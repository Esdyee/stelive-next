'use client'

import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default async function DarkMode() {

	const router = useRouter();

	useEffect(() => {
		const cookieDarkMode = document.cookie.split('; ').find(row => row.startsWith('darkMode='));
		if(!cookieDarkMode) {
			// darkmode, 1 month
			document.cookie = "darkMode=false; max-age=2592000;"
		}
	}, [])

	return(
		<button onClick={(e) => {
			const cookieDarkMode = document.cookie.split('; ').find(row => row.startsWith('darkMode='));
			let darkMode;
			if(!cookieDarkMode || cookieDarkMode.split('=')[1] === 'false') {
				document.cookie = "darkMode=false; max-age=2592000;"
				router.refresh();
			} else {
				document.cookie = "darkMode=true; max-age=2592000;"
				router.refresh();
			}

			// console.log("cookieDarkMode###", cookieDarkMode)

		}}>다크모드</button>
	)
}
