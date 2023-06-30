import { WithId, Document } from "mongodb";
import { ObjectId } from "bson";

export interface Post {
	id: string;
	title: string;
	content: string;
}
