import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "@/util/database";
import { ObjectId } from "bson";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Db } from "mongodb";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let id = req.body;
	const objectId = new ObjectId(id);

	if (req.method === "POST") {
		try {
			const client = await connectDB;
			const db = client.db("db-stelive");

			const session = await getServerSession(req, res, authOptions);

			// 삭제할 데이터 검색
			const findData = await getOneData(db);

			// 세션이 있고, 본인이 작성한 글만 삭제 가능
			if( !session
				|| session?.user?.email !== findData?.author
			) {
				return res.status(403).json('작성자만 삭제할 수 있습니다.');
			}

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

	// 삭제할 데이터 검색
	async function getOneData(db: Db) {
		let result = await db.collection('post')
			.findOne({ _id: objectId })
			.then((r) => {
				console.log(r);
				return r;
			})
			.catch((err) => {
				return res.status(500).json('MongoDB 처리 오류');
			});

		return result;
	}
}



