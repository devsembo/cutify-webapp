"use client"

import React, { useState } from "react"
import { Input } from "../_components/ui/input"
import { Button } from "../_components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function Login() {
  const [emailNumber, setEmailNumber] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await signIn("credentials", {
        emailNumber,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Falha no login. Verifique suas credenciais.")
      } else {
        toast.success("Login bem-sucedido!")
        router.push("/") // Redireciona para a página inicial após o login
      }
    } catch (error) {
      console.error("Erro durante o login:", error)
      toast.error("Ocorreu um erro durante o login.")
    }
  }

  const handleSocialLogin = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: "/" })
    } catch (error) {
      console.error(`Erro durante o login com ${provider}:`, error)
      toast.error(`Falha no login com ${provider}.`)
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-2"
      >
        <Link href={"/"}>
          <Image
            src={"/assets/logo_cutify/Logo-Final_invertido.png"}
            alt="Cutify logo"
            className="mb-16"
            width={120}
            height={120}
          />
        </Link>
        <p className="text-sm">LogIn ou SignUp</p>
        <Input
          className="w-80 p-2 text-white"
          placeholder="Email ou telemovel"
          type="text"
          value={emailNumber}
          onChange={(e) => setEmailNumber(e.target.value)}
          required
        />
        <Input
          className="w-80 p-2 text-white"
          placeholder="Palavra-passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Entrar</Button>
      </form>
      <p className="text-white">ou</p>
      <p>Continuar com</p>
      <div className="flex gap-4">
        <Button className="gap-2" onClick={() => handleSocialLogin("apple")}>
          <Image
            src={"/assets/icons/apple.svg"}
            alt="Apple logo"
            width={24}
            height={24}
          />
          Apple
        </Button>
        <Button className="gap-2" onClick={() => handleSocialLogin("google")}>
          <Image
            src={"/assets/icons/google.svg"}
            alt="google logo"
            width={16}
            height={16}
          />
          Google
        </Button>
      </div>
      <Link href={"/signup"} className="text-blue-600">
        Criar uma conta
      </Link>
    </div>
  )
}
