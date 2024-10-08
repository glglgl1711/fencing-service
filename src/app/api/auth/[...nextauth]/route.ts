import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

const handler = NextAuth({
    providers: [
      KakaoProvider({
        clientId: process.env.KAKAO_CLIENT_ID || "",
        clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            // 로그인 성공 시 access_token을 저장
            return {...token, ...account}
        },
        async session({session, token}) {
            session.user = token as any;
            return session;
        },
        
    },
  });
  
  export { handler as GET, handler as POST };