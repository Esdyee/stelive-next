'use client';

import { signIn, signOut } from "next-auth/react";

export default function LoginBtn({session} : {
	session: any
}) {
	return (
		<div className="float-right inline-block ms-2">
			{
				session 
					? <div>
						<img src={session.user.image} alt="profile" className="inline-block w-6 ms-2" />
						<span className={"ms-2"}>{session.user.name}</span>
						<button className={"ms-2"} onClick={() => {
							signOut()
						}}>로그아웃</button>
					</div>
						 
					: <button onClick={() => {
						signIn('')
					}}>로그인</button>
			}
		</div>
	)
}
