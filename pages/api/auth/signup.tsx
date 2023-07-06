import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	const { name, email, password } = req.body;
	const auth = "user";

	console.log("start signup");

	const hashPassword = await passwordEncrypt(password);

	console.log("hash-password", hashPassword);

	if (req.method === "POST") {

		// check validation
		if(!name || !email || !password) {
			return res.status(400).json('입력값이 없습니다.');
		}

		// check email
		const checkEmail = await checkDuplicatedEmail(email, res);
		if(checkEmail) {
			return res.status(400).json('중복된 이메일입니다.');
		}

		const client = await connectDB;
		const db = client.db("db-stelive");
		let result = await db.collection('user_cred')
			.insertOne({
				name,
				email,
				password: hashPassword,
				auth
			})
			.then((r) => {
				return res.redirect(302, "/");
			})
			.catch((err) => {
				return res.status(500).json('MongoDB 처리 오류');
			});
	}
}

// 암호화 function
async function passwordEncrypt(password: string) {
	console.log("hashing start");
	return await bcrypt.hash(password, 10);
}

// check duplicated email
async function checkDuplicatedEmail(email: string, res: NextApiResponse) {
	const client = await connectDB;
	const db = client.db("db-stelive");
	let result = await db.collection('user_cred').findOne({ email })
		.then((r) => {
			return r;
		})
		.catch((err) => {
			return res.status(500).json('MongoDB 처리 오류');
		});
	return result;
}
