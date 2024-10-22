"use client"
import { useContext } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import { setCookie } from "nookies"
import { useState } from "react"
import { setupAPIClient } from "@/services/api"
import { api } from "@/services/apiClient"
import { Button } from "../_components/ui/button"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthContext } from "@/contexts/AuthContext" // Ajuste o caminho conforme necessário

function GoogleLoginButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setUser } = useContext(AuthContext)

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true)
      try {
        const apiClient = setupAPIClient()
        const response = await apiClient.post("/auth/google", {
          token: tokenResponse.access_token,
        })

        const { id, nome, email, telemovel, token, fotoPerfil } = response.data

        setCookie(undefined, "@cutifywebtoken.token", token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        })

        setUser({
          id,
          nome,
          email,
          telemovel,
          fotoPerfil,
        })

        api.defaults.headers["Authorization"] = `Bearer ${token}`

        router.push("edit_profile")
      } catch (error) {
        console.error("Erro no login:", error)
      } finally {
        setLoading(false)
      }
    },
    onError: () => {
      console.log("Login Failed")
    },
  })

  return (
    <Button className="w-56 gap-2" onClick={() => login()} disabled={loading}>
      <Image
        src={"/assets/icons/google.svg"}
        alt="google logo"
        width={16}
        height={16}
      />
      Google
    </Button>
  )
}

export default GoogleLoginButton
