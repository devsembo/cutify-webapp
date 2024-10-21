"use client"
import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar"
import React, { useContext, useState } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { redirect, useRouter } from "next/navigation"
import { Button } from "../_components/ui/button"
import { Card, CardContent, CardHeader } from "../_components/ui/card"
import {
  ArrowBigRight,
  ArrowRight,
  BellRing,
  Calendar,
  ChevronLeftIcon,
  HelpCircle,
  MenuIcon,
} from "lucide-react"
import { Badge } from "../_components/ui/badge"
import Header from "../_components/header"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet"
import SideBarSheet from "../_components/sidebar-sheet"

export default function Profile() {
  const { isAuthenticated, user } = useContext(AuthContext)
  const router = useRouter()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const closeSheet = () => {
    setIsSheetOpen(false)
  }

  if (!isAuthenticated) {
    redirect("/login")
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

      <div className="flex h-screen flex-col items-center gap-4 py-24">
        <div className="flex h-2 flex-col items-center gap-2">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={`/https://cutify-api-g5dk.onrender.com/image/${user?.fotoPerfil}`}
            />
            <AvatarFallback className="text-6xl">
              {user?.nome ? user.nome[0].toUpperCase() : "C"}
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold uppercase text-white">{user?.nome}</p>
          <p className="mt-[-10px] text-[9px] font-light text-white">
            {user?.email}
          </p>

          <Button className="mt-4 rounded-3xl">Editar perfil</Button>

          <div className="flex flex-col gap-1">
            <div className="mt-16 flex w-96 flex-col gap-4">
              <p className="ml-1 text-gray-500">Atividade</p>
              <Card>
                <CardContent className="flex h-32 flex-col gap-3 bg-gray-900 p-2">
                  <div className="mt-3 flex w-full justify-between border-b-2 pb-4">
                    <div className="flex gap-1 px-2">
                      <Calendar />
                      <p className="mt-1 text-[12px] text-gray-400">
                        Histórico de agendamentos
                      </p>
                      <Badge className="bg-blue-600 text-xs text-white">
                        3
                      </Badge>
                    </div>

                    <ArrowRight size={20} color="gray" />
                  </div>
                  <div className="mt-3 flex w-full justify-between pb-4">
                    <div className="flex gap-4 px-2">
                      <HelpCircle className="mt-[2px]" />
                      <p className="mt-1 text-[12px] text-gray-400">
                        Ajuda e suporte
                      </p>
                    </div>

                    <ArrowRight size={20} color="gray" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-5 flex w-96 flex-col gap-4">
              <p className="ml-1 text-gray-500">Atividade</p>
              <Card>
                <CardContent className="flex h-64 flex-col gap-3 bg-gray-900 p-2">
                  <div className="mt-3 flex w-full justify-between border-b-2 pb-4">
                    <div className="flex gap-4 px-2">
                      <BellRing />
                      <p className="mt-1 text-[12px] text-gray-400">
                        Notificações
                      </p>
                    </div>

                    <ArrowRight size={20} color="gray" />
                  </div>
                  <div className="mt-3 flex w-full justify-between border-b-2 pb-4">
                    <div className="flex gap-4 px-2">
                      <HelpCircle className="mt-[2px]" />
                      <p className="mt-1 text-[12px] text-gray-400">
                        Temos e politica de privacidade
                      </p>
                    </div>

                    <ArrowRight size={20} color="gray" />
                  </div>
                  <div className="mt-3 flex w-full justify-between border-b-2 pb-4">
                    <div className="flex gap-4 px-2">
                      <HelpCircle className="mt-[2px]" />
                      <p className="mt-1 text-[12px] text-gray-400">
                        Ajuda e suporte
                      </p>
                    </div>

                    <ArrowRight size={20} color="gray" />
                  </div>
                  <div className="mt-1 flex w-full justify-between pb-4">
                    <div className="flex gap-4 px-2">
                      <HelpCircle className="mt-[2px]" />
                      <p className="mt-1 text-[12px] text-gray-400">
                        Ajuda e suporte
                      </p>
                    </div>

                    <ArrowRight size={20} color="gray" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
