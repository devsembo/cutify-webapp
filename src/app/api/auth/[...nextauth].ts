import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthOptions, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import CredentialsProvider from "next-auth/providers/credentials"
import { api } from "../../../services/apiClient"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"

interface CustomUser extends User {
  id: string
  emailNumber: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID as string,
      clientSecret: process.env.APPLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailNumber: { label: "Email/Número", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        try {
          const response = await api.post("/session", {
            emailNumber: credentials?.emailNumber,
            senha: credentials?.password,
          })

          if (response.data) {
            return {
              id: response.data.id,
              name: response.data.nome,
              email: response.data.emailNumber,
              emailNumber: response.data.emailNumber,
            }
          }
          return null
        } catch (error) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session(params: { session: Session; token: JWT; user: User }) {
      const { session, token, user } = params
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async jwt(params: { token: JWT; user?: User }) {
      const { token, user } = params
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: "/userAuth",
  },
  session: {
    strategy: "jwt",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
