import React from "react"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import banner from "../../public/assets/banner.png"
import { setupAPIClient } from "@/services/api"
import BarberShopItems from "./_components/barbershop-itmes"
import Footer from "./_components/footer"
import quickOption from "./_constants/search"
import BookingItem from "./_components/bookingItem"

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

        {/* BUSCA RAPIDA */}
        <div className="no-scrollbar mt-6 flex gap-3 overflow-x-scroll">
          {quickOption.map((option) => (
            <Button className="gap-3 border bg-gray-950" key={option.title}>
              <Image
                src={option.imageurl}
                alt={option.title}
                width={16}
                height={16}
              />
              <p className="text-white">{option.title}</p>
            </Button>
          ))}
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
        <BookingItem />

        {/* Reconmendados */}
        <h4 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          RECOMENDADOS
        </h4>
        <div className="no-scrollbar flex h-80 gap-4 overflow-auto">
          <BarberShopItems barbershops={barbershops} />
        </div>

        {/* POPULARES */}
        <h4 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          POPULARES
        </h4>
        <div className="no-scrollbar flex h-80 gap-4 overflow-auto">
          <BarberShopItems barbershops={barbershops} />
        </div>
      </div>
    </>
  )
}
