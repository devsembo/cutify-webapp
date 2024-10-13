"use client"
import React, { useState } from "react"
import { Input } from "../_components/ui/input"
import { Button } from "../_components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
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
  nome: z
    .string()
    .min(8, { message: "O nome deve ter pelo menos 8 caracteres." })
    .max(50, { message: "O nome não pode ter mais de 50 caracteres." }),

  email: z.string().email({ message: "Endereço de email inválido." }),

  senha: z
    .string()
    .min(6, { message: "A senha deve conter pelo menos 8 caracteres" })
    .max(50),
  telemovel: z
    .string()
    .regex(/^[0-9]{9}$/, {
      message: "O número de telemóvel deve ter 9 dígitos.",
    }),
})

export default function Login() {
  type FormValues = z.infer<typeof formSchema>
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      telemovel: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const apiclient = setupAPIClient()

    try {
      const response = await apiclient.post("/users", {
        nome: values.nome,
        email: values.email,
        senha: values.senha,
        telemovel: values.telemovel,
      })
      setAlertMessage(
        "Registo efetuado com sucesso, obrigado! enviamos um código de validção para seu telemovel.",
      )
      setIsSuccess(true)
      router.push("/tokenAuth")
    } catch (error) {
      console.error(error)
      setAlertMessage("Erro ao efetuar o registo. Por favor, tente novamente.")
      setIsSuccess(false)
      setIsAlertOpen(true)
    }
  }

  return (
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
      <p className="mb-4 text-xl">Registo</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-2">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Primeiro e Ultimo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="seu@email.com" {...field} />
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
          <FormField
            control={form.control}
            name="telemovel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telemóvel</FormLabel>
                <FormControl>
                  <Input placeholder="912345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-center">
            <Button type="submit">Registar</Button>
          </div>
        </form>
      </Form>
      <p>
        Já tem uma conta? faça o{" "}
        <Link href={"/login"} className="text-blue-600">
          Login
        </Link>
      </p>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="w-80 rounded">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isSuccess ? "Sucesso" : "Erro"}
            </AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsAlertOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
