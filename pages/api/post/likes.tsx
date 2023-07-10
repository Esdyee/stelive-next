import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "@/util/database";
// @ts-ignore
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ObjectId } from "bson";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	const { postId } = req.body;
	const postObjectId = new ObjectId(postId);
	let email: string = "";

	if (req.method === "GET") {
		const client = await connectDB;
		const db = client.db("db-stelive");

		// count like of post
		let result = await db.collection('likes')
			.countDocuments({ postObjectId });
		return res.status(200).json(result);

	}

	if (req.method === "POST") {

		// get ServerSession
		// @ts-ignore
		const session = await getServerSession(req, res, authOptions);
		if(!session) {
			return res.status(403).json('로그인이 필요합니다.');
		}

		// check email
		if(typeof session?.user?.email === "string") {
			email = session?.user?.email
		}


		const checkLike = await checkDuplicatedLikes(postObjectId, email, res);
		console.log(checkLike);
		if(checkLike) {
			return res.status(409).json('이미 좋아요를 누르셨습니다.');
		}

		const client = await connectDB;
		const db = client.db("db-stelive");

		// like increase count of post
		let result = await db.collection('post')
			.updateOne({ _id: postObjectId }, { $inc: { likes: 1 } })
			.then((r) => {
				db.collection('likes')
					.insertOne({
						email, postObjectId
					})
					.then((r) => {
						return res.status(200).json('처리완료');
					})
					.catch((err) => {
						return res.status(500).json('MongoDB 처리 오류');
					});
			});
	}
}

// check duplicated email
async function checkDuplicatedLikes(postObjectId:ObjectId, email: string, res: NextApiResponse) {
	console.log("###checkDuplicatedLikes", postObjectId, email);
	const client = await connectDB;
	const db = client.db("db-stelive");
	let result = await db.collection('likes')
		.findOne({
			postObjectId,
			email
		})
		.then((r) => {
			console.log("###checkDuplicatedLikes", r);
			return r;
		})
		.catch((err) => {
			return res.status(500).json('MongoDB 처리 오류');
		});
	return result;
}
