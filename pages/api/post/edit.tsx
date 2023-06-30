import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "@/util/database";
import { ObjectId } from "bson";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { title, content } = req.body;
	const id = req.body.id;
	const mongoId = new ObjectId(req.body.id);

	console.log("edit", title, content, id);

	// return res.status(200).json('처리완료');

	if (req.method === "POST") {

		// 공백 유효성 체크
		if(title.trim() === "" || content.trim() === "") {
			//화면 이동 X
			return res.status(400).json("데이터를 입력하세요.");
		}

		const client = await connectDB;
		const db = client.db("db-stelive");
		let result = await db.collection('post')
			.updateOne(
				{ _id: mongoId },
				{ $set: { title, content } }
			);

		return res.status(200).redirect(302, "/detail/" + id);
	}


}

