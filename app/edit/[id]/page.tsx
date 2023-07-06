import { ObjectId } from "bson";
import { connectDB } from "@/util/database";

export default async function Edit({
	params,
	searchParams,
	}: {
		params: { id: string }
		searchParams: { [key: string]: string | string[] | undefined }
	}) {
	const mongoId = params.id;
	const enableId = new ObjectId(mongoId);

	const client = await connectDB;
	const db = client.db("db-stelive");

	let title: string;
	let content: string;

	// search by id
	let result = await db.collection('post').findOne({_id: enableId});

	// console.log(result);

	return (
		<div>
			<h1>수정페이지</h1>
			<form action={'/api/post/edit'} method="POST">
				<input type={"hidden"} name={"id"} value={mongoId} />
				<div className="bg-gray-500 p-4 text-black">
					<input className="p-2" type="text" name={"title"} placeholder={"제목"}
						   defaultValue={result?.title} />
				</div>
				<div className="bg-gray-500 p-4 text-black">
					<input className="p-2" type="text" name={"content"} placeholder={"내용"}
						   defaultValue={result?.content} />
				</div>
				<div className="bg-gray-500 p-4">
					<button
						className="bg-amber-400 p-4 text-black"  type="submit">
						수정
					</button>
				</div>

			</form>
		</div>
	)
}
