import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "@/util/database";
import { ObjectId } from "bson";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const id = req.body;

	if (req.method === "POST") {
		// const client = await connectDB;
		// const db = client.db("db-stelive");
		// let result = await db.collection('post')
		// 	.deleteOne({ _id: new ObjectId(id) })
		return res.status(200).json('처리완료');
	}


}

