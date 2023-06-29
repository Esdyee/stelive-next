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
		const client = await connectDB;
		const db = client.db("db-stelive");
		let result = await db.collection('post')
			.updateOne({ _id: mongoId }, { $set: { title, content } });

		return res.status(200).redirect(302, "/detail/" + id);
	}


}

