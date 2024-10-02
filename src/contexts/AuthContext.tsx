import { createContext, ReactNode, useState, useEffect } from "react"
import { destroyCookie, setCookie, parseCookies } from "nookies"
import Router from "next/router"
import { api } from "../services/apiClient"

type AuthContextData = {
  user: UserProps | undefined
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
  signUp: (Credential: SignUpProps) => Promise<void>
}

type UserProps = {
  id: string
  nome: string
  emailNumber: string
  nivel: number
}

type SignInProps = {
  emailNumber: string
  password: string
}

type SignUpProps = {
  nome: string
  email: string
  num_inscric: string
  telemovel: string
  password: string
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(undefined, "@consuauth.token")
    Router.push("/")
  } catch (error) {
    console.log("Erro ao deslogar", error)
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { "@cutifywebtoken.token": token } = parseCookies()

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, nome, emailNumber, nivel } = response.data

          setUser({ id, nome, emailNumber, nivel })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signUp({
    nome,
    email,
    num_inscric,
    password,
    telemovel,
  }: SignUpProps) {
    alert(
      `nome:  ${nome} email: ${email}  nº consular:  ${num_inscric}  senha: ${password} phone: ${telemovel}`,
    )

    try {
      const response = await api.post("/users", {
        nome,
        email,
        num_inscric,
        password,
        telemovel,
      })

      Router.push("/userAuth")
    } catch (error) {
      console.error("Preencha todos os campos", error)
    }
  }

  async function signIn({ emailNumber, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        emailNumber,
        password,
      })

      const { id, nome, nivel, token } = response.data

      setCookie(undefined, "@consuauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      })

      setUser({
        id,
        nome,
        emailNumber,
        nivel,
      })

      api.defaults.headers["Authorization"] = `Bearer ${token}`

      Router.push("/")
    } catch (error) {
      console.error("Dados inválidos ", error)
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
