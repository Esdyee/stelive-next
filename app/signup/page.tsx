export default function SignUp() {
	return(
		<div className={"bg-green-800 m-auto"}>
			<form className={"bg-amber-400 m-auto p-4 text-black"} method={"POST"}
				  style={{width: "500px"}} action={"/api/auth/signup"}>
				<input className={"w-full p-4"}
					   type={"text"} name={"name"} placeholder={"이름"} />
				<input className={"w-full p-4 mt-2"}
					type={"text"} name={"email"} placeholder={"이메일"} />
				<input className={"w-full p-4 mt-2"}
					type={"password"} name={"password"} placeholder={"비밀번호"} />
				<button className={"w-full bg-gray-500 p-2 mt-2"}>전송</button>
			</form>
		</div>
	)

}
