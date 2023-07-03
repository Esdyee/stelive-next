import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "@/util/database";
import { ObjectId } from "bson";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let id = req.query.itemId;
	console.log(id);
	const objectId = new ObjectId(id);

	if (req.method === "GET") {
		try {
			const client = await connectDB;
			const db = client.db("db-stelive");

			let result = await db.collection('post')
				.deleteOne({ _id: objectId })
				.then((r) => {
					// throw new Error("게시물을 찾을 수 없습니다.");
					return res.status(200).json('처리완료');
				})
				.catch((err) => {
					return res.status(500).json('MongoDB 처리 오류');
				});
		} catch (error) {
			return res.status(500).json('처리실패');
		}
	}

}

