// @ts-nocheck
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://nextjsTest:!23qweasd@nestcluster.axt8d.mongodb.net/?retryWrites=true&w=majority";

const options = {
	useNewUrlParser: true,
}

let client
let connectDB

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options)
		global._mongoClientPromise = client.connect()
	}
	connectDB = global._mongoClientPromise
} else {
	client = new MongoClient(uri, options)
	connectDB = client.connect()
}

export { connectDB }
