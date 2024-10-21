"use client"
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react"
import { destroyCookie, setCookie } from "nookies"
import { useRouter } from "next/navigation"
import { api } from "../services/apiClient"
import { toast } from "sonner"

type AuthContextData = {
  user: UserProps | null
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
  signUp: (Credential: SignUpProps) => Promise<void>
  setUser: (user: UserProps) => void
}

type UserProps = {
  id: string
  nome: string
  email: string
  telemovel: string
  fotoPerfil: string
}

type SignInProps = {
  emailNumber: string
  senha: string
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

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      return storedUser ? JSON.parse(storedUser) : null
    }
    return null
  })

  const router = useRouter()
  const isAuthenticated = !!user

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  const signOut = useCallback(() => {
    try {
      destroyCookie(undefined, "@cutifywebtoken.token")
      setUser(null)
      localStorage.removeItem("user")
      router.push("/agendamentos")
    } catch (error) {
      console.error("Erro ao deslogar", error)
    }
  }, [router])

  const signUp = useCallback(
    async ({ nome, email, num_inscric, password, telemovel }: SignUpProps) => {
      try {
        await api.post("/users", {
          nome,
          email,
          num_inscric,
          password,
          telemovel,
        })
        toast.success("Registo concluído com sucesso.")
        router.push("/userAuth")
      } catch (error) {
        toast.error(
          "Dados inválidos, preencha devidamente os campos e tente novamente.",
        )
        console.error("Erro no registro:", error)
      }
    },
    [router],
  )

  const signIn = useCallback(
    async ({ emailNumber, senha }: SignInProps) => {
      try {
        const response = await api.post("/login", { emailNumber, senha })
        const { id, nome, telemovel, email, token, fotoPerfil } = response.data
        setCookie(undefined, "@cutifywebtoken.token", token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        })

        setUser({ id, nome, email, telemovel, fotoPerfil })
        api.defaults.headers["Authorization"] = `Bearer ${token}`
        router.push("/")
      } catch (error) {
        toast.error("Email ou senha inválidos!", {
          className: "bg-red",
        })
        console.error("Erro ao acessar:", error)
      }
    },
    [router],
  )

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp, setUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
