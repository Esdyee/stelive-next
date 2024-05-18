import { MongoClient } from "mongodb";
import { connectDB } from "../util/database";
import NextuiButton from "@/app/components/nextuiButton";
import TestCard from "./components/TestCard";

export default async function Home() {

    const client = await connectDB;
    const db = client.db("db-stelive");
    let result = await db.collection('post').find().toArray()

    return (
        <div>
            <div className="text-white">
                <h1 className="text-red-700">Stelive2</h1>
                <div>
                    <h1 className={'text-black'}>Welcome to My NextUI App!</h1>
                    <NextuiButton />
					<TestCard />
                    <p className={'text-black'}>test</p>
                </div>
            </div>
        </div>
    )
}
