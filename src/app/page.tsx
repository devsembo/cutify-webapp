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
import OtherBarber from "../../public/assets/barber.jpg"
import { setupAPIClient } from "@/services/api"
import BarberShopItems from "./_components/barbershop-itmes"

type BarbershopProps = {
  id: string
  nome: string
  endereco: string
  telefone: string
  fotoCapa: string
  mediaEstrelas: number
}

async function getData(): Promise<BarbershopProps[]> {
  const apiClient = setupAPIClient()
  const response = await apiClient.get("/barbershops")

  console.log(response)
  return response.data
}

export default async function Home() {
  const barbershops = await getData()

  return (
    <>
      <Header />
      <div className="mt-4">
        <h2>
          Olá, <span className="text-xl font-bold">Anderson!</span>
        </h2>
        <p>Segunda-feira, 01 de Outubro.</p>

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
        <h4 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Proxima marcação
        </h4>
        <div className="w-full">
          <Card className="mt-3 bg-gray-950">
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge className="h-6 w-fit bg-green-100 text-green-600">
                  Confirmado
                </Badge>
                <h3 className="font-semibold">Corte de cabelo</h3>

                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 overflow-hidden rounded-full">
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

        {/* Reconmendados */}
        <h4 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          RECOMENDADOS
        </h4>
        <div className="[&:: -webkit-scrollbar]:hidden flex h-80 gap-4 overflow-auto">
          <BarberShopItems barbershops={barbershops} />
        </div>

        {/* POPULARES */}
        <h4 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          POPULARES
        </h4>
        <div className="flex w-full flex-row gap-8 overflow-scroll pb-4">
          <Card className="h-72 w-48 bg-gray-950">
            <CardContent className="flex w-48 flex-col justify-center gap-1 p-0">
              <Image
                src={OtherBarber}
                alt="Classic BarberShop "
                width={500}
                height={300}
                className="h-40 rounded-2xl object-cover p-2"
              />
              <p className="ml-1 text-sm font-semibold text-white">
                El Peloquero
              </p>
              <p className="p-1 text-xs text-gray-500">
                Rua de Fernandes Tomás 121, Porto.
              </p>
              <Button className="mx-4 flex h-8 w-40 items-center justify-center bg-gray-800 text-sm text-white">
                Reservar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
