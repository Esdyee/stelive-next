import { connectDB } from "@/util/database";


export default async function List() {

	const client = await connectDB;
	const db = client.db("db-stelive");
	let result: unknown[] = await db.collection('post').find().toArray();

	return (
		<div className="list-bg">
			{result.map((item: unknown, index: number) => (
				<div className="list-item p-5 border-2 border-gray-500 mt-1" key={index}>
					<h4 className="text-xl font-semibold">{(item as Test).title}</h4>
					<p>{(item as Test).content}</p>
				</div>
			))}
		</div>
	)
}
