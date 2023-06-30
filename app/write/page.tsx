import { ObjectId } from "bson";
import { connectDB } from "@/util/database";

export default async function Edit({
	params,
	searchParams,
	}: {
		params: { id: string }
		searchParams: { [key: string]: string | string[] | undefined }
	}) {

	return (
		<div>
			<h1>생성페이지</h1>
			<form action={'/api/post/new'} method="POST">
				<div className="p-4 bg-gray-500 text-black">
					<input className="p-2" type="text" name={"title"} placeholder={"제목"}/>
				</div>
				<div className="p-4 bg-gray-500 text-black">
					<input className="p-2" type="text" name={"content"} placeholder={"내용"}/>
				</div>
				<div className="p-4 bg-gray-500">
					<button
						className="bg-amber-400 text-black p-4"  type="submit">
						생성
					</button>
				</div>

			</form>
		</div>
	)
}
