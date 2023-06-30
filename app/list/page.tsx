import { connectDB } from "@/util/database";
import Link from "next/link";
import ListItem from "@/app/list/list-item";
import { Post } from "./interface";
import { Document, WithId } from "mongodb";

export interface PostDocument extends WithId<Document> {
	id: string;
	title: string;
	content: string;
}
export default async function List() {

	const client = await connectDB;
	const db = client.db("db-stelive");

	let result = await db.collection('post').find().toArray()

	let data: Post[] = result.map((item) => {
		return {
			id: item._id.toString(),
			title: item.title,
			content: item.content
		}
	});

	return (
		<div className="list-bg">
			<ListItem data={data}/>
		</div>
	)
}
