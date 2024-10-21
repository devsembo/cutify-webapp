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
  token: z
    .string()
    .min(6, { message: "O token possuí 6 digitos." })
    .max(6, { message: "O token possuí 6 digitos" }),
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
      token: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const apiclient = setupAPIClient()

    try {
      const response = await apiclient.post("/auth/token", {
        nome: values.token,
      })
      setAlertMessage(
        "Registo efetuado com sucesso, obrigado! enviamos um código de validção para seu telemovel.",
      )
      setIsSuccess(true)
      router.push("/login")
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
      <p className="mb-4">Valide o token para ativar a sua conta</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-2">
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token</FormLabel>
                <FormControl>
                  <Input placeholder="856234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-center">
            <Button type="submit">Verificar</Button>
          </div>
        </form>
      </Form>
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
