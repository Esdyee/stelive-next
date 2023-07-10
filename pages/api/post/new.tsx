import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { title, content } = req.body;

	if (req.method === "POST") {
		let email;
		const client = await connectDB;
		// @ts-ignore
		const session = await getServerSession(req, res, authOptions);
		if(!!session) {
			console.log("server", session?.user?.email);
			email = session?.user?.email;
		}
		const db = client.db("db-stelive");
		let result = await db.collection('post').insertOne({ title, content, author: email });

		return res.status(200).redirect(302, "/list");
	}


}

