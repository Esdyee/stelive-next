import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDB } from "@/util/database";

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: 'f7b8271fba3284cba429',
			clientSecret: 'c13897dbf05bb2722c75e2387a1b90d54b91b478',
		}),
	],
	secret : '!23qweasd',
	adapter: MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions);
