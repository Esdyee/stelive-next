import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ObjectId } from "bson";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	const { parentId, comment } = req.body;
	let objectParentId;

	//get url parameter
	const { postId } = req.query;

	console.log(postId);

	if (req.method === "GET") {

		if(typeof postId === "string") {
			objectParentId = new ObjectId(postId);
		}

		const client = await connectDB;
		const db = client.db("db-stelive");
		let result = await db.collection('comment')
			.find({ parentId: objectParentId })
			.toArray();

		return res.status(200).json(result)
	}


	if (req.method === "POST") {
		objectParentId = new ObjectId(parentId);
		let email, name;
		const client = await connectDB;
		// @ts-ignore
		const session = await getServerSession(req, res, authOptions);

		if(!session) {
			return res.status(403).json('로그인이 필요합니다.');
		} else {

			email = session?.user?.email;
			name = session?.user?.name;
		}


		const db = client.db("db-stelive");
		let result = await db.collection('comment')
			.insertOne({
				parentId: objectParentId,
				name,
				email,
				comment
			});

		return res.status(200).json("처리완료")
	}


}

