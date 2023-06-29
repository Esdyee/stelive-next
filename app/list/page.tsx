import { connectDB } from "@/util/database";
import Link from "next/link";


export default async function List() {

	const client = await connectDB;
	const db = client.db("db-stelive");
	let result: unknown[] = await db.collection('post').find().toArray();
	console.log(result);

	return (
		<div className="list-bg">
			{result.map((item: unknown, index: number) => (
				<Link href={`/detail/${(item as Test)._id}`}>
					<div className="list-item p-5 border-2 border-gray-500 mt-1" key={index}>
						<h4 className="text-xl font-semibold">{(item as Test).title}</h4>
						<p>{(item as Test).content}</p>
						<Link className="bg-green-800 mt-2 p-2 text-white inline-block"
							href={`/edit/${(item as Test)._id}`}>수정</Link>
					</div>
				</Link>

			))}
		</div>
	)
}
