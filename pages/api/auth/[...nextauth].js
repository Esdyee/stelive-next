import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: 'f7b8271fba3284cba429',
			clientSecret: 'c13897dbf05bb2722c75e2387a1b90d54b91b478',
		}),
	],
	secret : '!23qweasd'
};
export default NextAuth(authOptions);
