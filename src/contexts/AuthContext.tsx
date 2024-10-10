import { createContext, ReactNode, useState, useEffect } from "react"
import { destroyCookie, setCookie, parseCookies } from "nookies"
import Router from "next/router"
import { api } from "../services/apiClient"
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  useSession,
} from "next-auth/react"

type AuthContextData = {
  user: UserProps | undefined
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
  signUp: (Credential: SignUpProps) => Promise<void>
}

type UserProps = {
  id: string
  nome?: string | null
  email?: string | null
  image?: string | null
  telemovel?: string | null
}

type SignInProps = {
  emailNumber: string
  password: string
}

type SignUpProps = {
  nome: string
  email: string
  telemovel: string
  senha: string
}

type AuthProviderProps = {
  children: ReactNode
}
export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(undefined, "@cutifywebtoken.token")
    nextAuthSignOut()
    Router.push("/")
  } catch (error) {
    console.log("Erro ao deslogar", error)
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const { data: session, status } = useSession()
  const isAuthenticated = !!user || !!session

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        nome: session.user.name ?? "",
        telemovel: session.user.telemovel ?? session.user.email ?? "",
        image: session.user.image ?? null,
      })
    } else if (status === "unauthenticated") {
      const { "@cutifywebtoken.token": token } = parseCookies()
      if (token) {
        api
          .get("/me")
          .then((response) => {
            const { id, nome, telemovel } = response.data
            setUser({ id, nome, telemovel })
          })
          .catch(() => signOut())
      }
    }
  }, [session, status])

  async function signIn({ emailNumber, password }: SignInProps) {
    try {
      const result = await nextAuthSignIn("credentials", {
        emailNumber,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      const { "@cutifywebtoken.token": token } = parseCookies()
      if (token) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`
      }

      Router.push("/")
    } catch (error) {
      console.error("Dados inválidos ", error)
    }
  }

  async function signUp({ nome, email, senha, telemovel }: SignUpProps) {
    try {
      const response = await api.post("/users", {
        nome,
        email,
        senha,
        telemovel,
      })

      Router.push("/userAuth")
    } catch (error) {
      console.error("Preencha todos os campos", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  )
}
