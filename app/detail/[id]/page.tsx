import { connectDB } from "@/util/database";
import Link from "next/link";
import { ObjectId } from "bson";

export default async function Detail(props) {

	const mongoId = props.params.id;
	const enableId = new ObjectId(mongoId);

	const client = await connectDB;
	const db = client.db("db-stelive");

	// search by id
	let result = await db.collection('post').findOne({_id: enableId});

	if(!result) {
		return (
			<div>
				<h4>상세페이지</h4>
				<h4>데이터가 없습니다.</h4>
			</div>
		)
	}

	return(
		<div>
			<h4>상세페이지</h4>
			<h4>{result.title}</h4>
			<p>{result.content}</p>
		</div>
	)
}
