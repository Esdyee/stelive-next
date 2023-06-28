import Image from 'next/image'
import Link from "next/link";
import { MongoClient } from "mongodb";
import { connectDB } from "../util/database";

export default async function Home() {

	const client = await connectDB;
	const db = client.db("db-stelive");
	let result = await db.collection('post').find().toArray()

	return (
		<div>
			<div className="text-white">
				<h1 className="text-red-700">Stelive</h1>
			</div>
		</div>
	)
}
