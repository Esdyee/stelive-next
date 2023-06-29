import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "@/util/database";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { title, content } = req.body;


	if (req.method === "POST") {
		const client = await connectDB;
		const db = client.db("db-stelive");
		let result = await db.collection('post').insertOne({ title, content });

		return res.status(200).redirect(302, "/list");
	}


}

