"use client"
import React, { useContext, useState, useEffect } from "react"
import { Button } from "./ui/button"
import { AuthContext } from "@/contexts/AuthContext"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Calendar, HomeIcon, LogInIcon, LogOut } from "lucide-react"
import { SheetContent, SheetHeader, SheetTitle, SheetClose } from "./ui/sheet"
import quickOption from "../_constants/search"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import Link from "next/link"

interface SideBarSheetProps {
  onClose: () => void // Definindo a prop onClose
}

const SideBarSheet: React.FC<SideBarSheetProps> = ({ onClose }) => {
  const { isAuthenticated, user, signOut } = useContext(AuthContext)
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      onClose() // Fecha o Sheet
      router.push("/") // Redireciona para a página inicial
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  return (
    <>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
          {isAuthenticated ? (
            <div className="flex gap-5">
              <Avatar>
                <AvatarImage
                  src={user?.fotoPerfil}
                  alt="Foto de perfil do usuario"
                  width={26}
                  height={26}
                  className="rounded"
                />
                <AvatarFallback>
                  {user?.nome ? user.nome[0].toUpperCase() : "C"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">{user?.nome || "Nome do Usuário"}</p>
                <p className="text-xs">{user?.email || "email@exemplo.com"}</p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="font-medium">Olá, faça o seu login!</h2>
              <Button size="icon" className="h-8 w-8" variant="outline" asChild>
                <Link href="/login">
                  <LogInIcon size={16} />
                </Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex flex-col gap-4 border-b border-solid p-5">
          <SheetClose asChild>
            <Button className="justify-start gap-2" variant={"ghost"} asChild>
              <Link href={"/"}>
                <HomeIcon size={18} />
                Inicio
              </Link>
            </Button>
          </SheetClose>
          {isAuthenticated ? (
            <Button className="justify-start gap-2" variant={"ghost"} asChild>
              <Link href={"/agendamentos"}>
                <Calendar size={18} />
                Agendamentos
              </Link>
            </Button>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-4 border-b border-solid p-5">
          {quickOption.map((option) => (
            <Button
              className="justify-start gap-2"
              variant={"ghost"}
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageurl}
                  alt={option.imageurl}
                  width={18}
                  height={18}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-solid py-5">
          {isAuthenticated ? (
            <Button
              variant={"outline"}
              className="gap-3 text-red-600"
              onClick={handleSignOut}
            >
              <LogOut size={18} color="red" />
              Terminar sessão
            </Button>
          ) : (
            <div>
              <p className="text-xs text-gray-400">
                Os melhores, nos melhores.{" "}
                <span className="font-bold text-blue-700">CUTIFY</span>
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </>
  )
}

export default SideBarSheet
