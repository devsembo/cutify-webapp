"use client"
import React from "react"
import { Button } from "./ui/button"
import Image from "next/image"
import {
  Apple,
  AppleIcon,
  Calendar,
  HomeIcon,
  LogInIcon,
  LogOut,
  MenuIcon,
} from "lucide-react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet"
import quickOption from "../_constants/search"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog"

function SideBarSheet() {
  return (
    <>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="bordr-b flex items-center justify-between gap-3 border-b border-solid py-5">
          <h2 className="font-bold">Olá, faça o seu login!</h2>
          <Button size={"icon"} className="h-8 w-8" variant={"outline"} asChild>
            <Link href={"/login"}>
              <LogInIcon size={16} />
            </Link>
          </Button>

          {/*
          <Avatar>
            <AvatarImage
              src="/assets/avatar.jpg"
              alt="Foto de perfil do usuario"
              width={26}
              height={26}
              className="rounded"
            />
            <AvatarFallback>CB</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-bold">Anderson Pedro</p>
            <p className="text-xs">anderson@devsembo.pt </p>
          </div>
            */}
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
          <Button className="justify-start gap-2" variant={"ghost"} asChild>
            <Link href={"/agendamentos"}>
              <Calendar size={18} />
              Agendamentos
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-4 border-b border-solid p-5">
          {quickOption.map((option) => (
            <Button
              className="justify-start gap-2"
              variant={"ghost"}
              key={option.title}
            >
              <Image
                src={option.imageurl}
                alt={option.imageurl}
                width={18}
                height={18}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-solid py-5">
          <Button variant={"outline"} className="gap-3 text-red-600">
            <LogOut size={18} color="red" />
            Terminar sessão
          </Button>
        </div>
      </SheetContent>
    </>
  )
}

export default SideBarSheet
