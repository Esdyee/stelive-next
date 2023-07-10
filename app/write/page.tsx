import { ObjectId } from "bson";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from 'next/navigation'

export default async function Edit({
	params,
	searchParams,
	}: {
		params: { id: string }
		searchParams: { [key: string]: string | string[] | undefined },
	}) {

	// @ts-ignore
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/list');
	}

	return (
		<div>
			<h1>생성페이지</h1>
			<form action={'/api/post/new'} method="POST">
				<div className="bg-gray-500 p-4 text-black">
					<input className="p-2" type="text" name={"title"} placeholder={"제목"}/>
				</div>
				<div className="bg-gray-500 p-4 text-black">
					<input className="p-2" type="text" name={"content"} placeholder={"내용"}/>
				</div>
				<div className="bg-gray-500 p-4">
					<button
						className="bg-amber-400 p-4 text-black"  type="submit">
						생성
					</button>
				</div>

			</form>
		</div>
	)
}
