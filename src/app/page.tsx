import React from "react"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import banner from "../../public/assets/banner.png"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
export default function Home() {
  return (
    <>
      <Header />
      <div className="p-5">
        <h2>
          Olá, <span className="text-xl font-bold">Anderson!</span>
        </h2>
        <p>Segunda-feira, 30 de Outubro.</p>

        {/* Busca */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Pesquisa" className="text-white" />
          <Button size="icon">
            <SearchIcon />
          </Button>
        </div>

        {/* Imagem */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src={banner}
            fill
            className="rounded-xl border border-solid border-white object-cover"
            alt="Agnede com os melhores com a cutify"
          />
        </div>

        {/* AGENDAMENTO */}
        <div className="flex"></div>
        <Card className="mt-6">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="h-6 w-fit bg-green-100 text-green-600">
                Confirmado
              </Badge>
              <h3 className="font-semibold">Corte de cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 overflow-hidden rounded-full">
                  <AvatarImage
                    src="http://localhost:3333/image/e7139d5ad3-Captura de ecrÃ£ 2024-09-29 203401.png"
                    alt="Mike Pina Barbeiro da Classic BarberShop"
                  />
                  <AvatarFallback>CB</AvatarFallback>
                </Avatar>
                <p className="text-sm">Classic BarberShop</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Outubro</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">18:45</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
