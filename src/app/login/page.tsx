"use client"
import React, { useState, Suspense, useContext } from "react"
import { Input } from "../_components/ui/input"
import { Button } from "../_components/ui/button"
import Image from "next/image"
import Link from "next/link"
import GoogleLoginButton from "../_components/LoginGoogleBtn"
import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "../_components/ui/alert-dialog"
import { setupAPIClient } from "@/services/api"

const formSchema = z.object({
  emailNumber: z.string().min(9, { message: "Endereço de email inválido." }),

  senha: z
    .string()
    .min(6, { message: "A senha deve conter pelo menos 8 caracteres" })
    .max(50),
})

export default function Login() {
  type FormValues = z.infer<typeof formSchema>
  const router = useRouter()
  const authContext = useContext(AuthContext)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailNumber: "",
      senha: "",
    },
  })

  const { signIn } = authContext

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const emailNumber = values.emailNumber
    const senha = values.senha

    const data = {
      emailNumber,
      senha,
    }
    await signIn(data)
  }

  return (
    <Suspense fallback={<div> Carregando...</div>}>
      <div className="flex h-screen flex-col items-center justify-center gap-2">
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-80 space-y-2"
          >
            <FormField
              control={form.control}
              name="emailNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email ou Telemóvel</FormLabel>
                  <FormControl>
                    <Input
                      type="username"
                      placeholder="Email ou Telemóvel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="A sua palavra-passe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center">
              <Button type="submit">Entrar</Button>
            </div>
          </form>
        </Form>
        <p className="text-white">ou</p>
        <p>Continuar com</p>
        <div className="flex gap-4">
          <GoogleLoginButton />
        </div>
        <p className="text-sm">
          Ainda não tem uma conta? Faça já o seu
          <Link href={"/signup"} className="ml-2 text-blue-600">
            Registo
          </Link>
        </p>
      </div>
    </Suspense>
  )
}
