"use client"
import React, { useState } from "react"
import { Input } from "../_components/ui/input"
import { Button } from "../_components/ui/button"
import Image from "next/image"
import Link from "next/link"
import GoogleLoginButton from "../_components/LoginGoogleBtn"

export default function Login() {
  const [emailNumber, setEmailNumber] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <form className="flex flex-col items-center justify-center gap-2">
        <Link href={"/"}>
          <Image
            src={"/assets/logo_cutify/Logo-Final_invertido.png"}
            alt="Cutify logo"
            className="mb-5"
            width={120}
            height={120}
          />
        </Link>
        <p className="mb-4 text-xl">Login</p>
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
        <GoogleLoginButton />
      </div>
      <p className="text-sm">
        Ainda não tem uma conta? faça já o seu
        <Link href={"/signup"} className="ml-2 text-blue-600">
          Registo
        </Link>
      </p>
    </div>
  )
}
