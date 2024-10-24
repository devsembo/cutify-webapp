"use client"
import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar"
import React, {
  useContext,
  useEffect,
  useRef,
  ChangeEvent,
  useState,
} from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "../_components/ui/button"
import { Card, CardContent, CardHeader } from "../_components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  ArrowRight,
  BellRing,
  Calendar,
  Camera,
  ChevronLeftIcon,
  HelpCircle,
  Loader,
  LogOut,
  Upload,
} from "lucide-react"
import { Badge } from "../_components/ui/badge"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "../_components/ui/alert-dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form"

import Link from "next/link"
import { Input } from "../_components/ui/input"
import { setupAPIClient } from "@/services/api"

const formSchema = z.object({
  senha: z
    .string()
    .min(6, { message: "A senha deve conter pelo menos 8 caracteres" })
    .max(50),
  telemovel: z.string().regex(/^[0-9]{9}$/, {
    message: "O número de telemóvel deve ter 9 dígitos.",
  }),
})

export default function Edit_Profile() {
  const { isAuthenticated, user } = useContext(AuthContext)
  type FormValues = z.infer<typeof formSchema>
  const [avatarUrl, setAvatarUrl] = useState(
    user?.fotoPerfil
      ? `https://cutify-api-g5dk.onrender.com/image/${user.fotoPerfil}`
      : "",
  )
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senha: "",
      telemovel: "",
    },
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }

    if (user?.telemovel) {
      router.push("/")
    }
  }, [isAuthenticated, user, router])

  function handleUploadClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    setIsUploading(true)
    try {
      if (file) {
        console.log("Arquivo selecionado:", file.name)
        const apiclient = setupAPIClient()
        try {
          const formData = new FormData()
          formData.append("file", file)

          const response = await apiclient.put(
            "/your-upload-endpoint",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          )

          console.log("Upload bem-sucedido:", response.data)

          // Assumindo que a resposta contém a URL da nova imagem
          if (response.data && response.data.imageUrl) {
            setAvatarUrl(response.data.imageUrl)
          }
        } catch (error) {
          console.error("Erro ao fazer o upload:", error)
          // Adicione aqui o tratamento de erro apropriado
        }
      }
      setIsUploading(false)
    } catch (error) {
      setIsUploading(false)
      // ... tratamento de erro
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const apiclient = setupAPIClient()

    try {
      const response = await apiclient.put("/user/infoupdt", {
        user_id: user?.id,
        senha: values.senha,
        telemovel: values.telemovel,
      })
      setAlertMessage(
        "Registo efetuado com sucesso, obrigado! enviamos um código de validção para seu telemovel.",
      )
      setIsSuccess(true)
      router.push("/")
    } catch (error) {
      console.error(error)
      setAlertMessage("Erro ao efetuar o registo. Por favor, tente novamente.")
      setIsSuccess(false)
      setIsAlertOpen(true)
    }
  }

  return (
    <>
      <Button
        size={"icon"}
        variant={"secondary"}
        className="absolute left-4 top-4 opacity-85"
        asChild
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>

      <div className="flex flex-col items-center gap-4 py-10">
        <div className="flex h-2 flex-col items-center gap-2">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.fotoPerfil} />
            <AvatarFallback className="text-6xl">
              {user?.nome ? user.nome[0].toUpperCase() : "C"}
            </AvatarFallback>
          </Avatar>{" "}
          <p className="font-semibold uppercase text-white">{user?.nome}</p>
          <p className="mt-[-10px] text-[9px] font-light text-white">
            {user?.email}
          </p>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
            />
            <Button
              className="mt-4 flex h-12 flex-col items-center justify-center rounded-3xl"
              onClick={handleUploadClick}
              disabled={isUploading}
            >
              {isUploading ? <Loader /> : <Upload />}
              <p className="text-xs">
                {isUploading ? <Loader /> : "Adicionar foto de perfil"}
              </p>
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <div className="mt-16 flex w-80 flex-col gap-4">
              <p className="ml-1 flex justify-center text-gray-500">
                Os meus dados
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-80 space-y-2"
                >
                  <FormLabel>Nome</FormLabel>
                  <Input placeholder={user?.nome} disabled />
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder={user?.email} disabled />

                  <FormField
                    control={form.control}
                    name="senha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********" // Placeholder com pontos
                            disabled // Campo desabilitado
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
                          <Input
                            type="text"
                            placeholder={user?.telemovel || "O seu telemóvel"}
                            disabled
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col items-center">
                    <Button type="submit">Atualizar dados</Button>
                  </div>
                </form>
              </Form>
            </div>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogContent className="w-80 rounded">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {isSuccess ? "Sucesso" : "Erro"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {alertMessage}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => setIsAlertOpen(false)}>
                    OK
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  )
}
