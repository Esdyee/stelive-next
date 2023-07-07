import { connectDB } from "@/util/database";
import Link from "next/link";
import { ObjectId } from "bson";
import Comment from "@/app/detail/comment";

// @ts-ignore
export default async function Detail(props) {

	const mongoId = props.params.id;
	const enableId = new ObjectId(mongoId);

	const client = await connectDB;
	const db = client.db("db-stelive");

	// search by id
	let result = await db.collection('post').findOne({_id: enableId});

	// search comment
	let commentDocument = await db.collection('comment').find({parentId: enableId}).toArray();
	const comments = commentDocument.map((comment) => {
		return {
			parentId: comment.parentId.toString(),
			name: comment.name,
			email: comment.email,
			comment: comment.comment,
		}
	});

	console.log("comments", comments);

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
			<div className={"bg-gray-600 mt-5 p-3"}>
				<h4>제목 : {result.title}</h4>
				<p>내용 : {result.content}</p>
				<Comment
					postId={mongoId}
					comments={comments}
				/>
			</div>
		</div>
	)
}
