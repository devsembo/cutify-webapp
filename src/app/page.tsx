import React from "react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { setupAPIClient } from "@/services/api"
import BarberShopItems from "./_components/barbershop-itmes"
import UserGreeting from "./_components/userGreeting"

import quickOption from "./_constants/search"
import BookingItem from "./_components/bookingItem"
import CurrentDate from "./_components/CurretDate"
import Link from "next/link"
import SearchItem from "./_components/SearchItem"
import SugestItem from "./_components/SugestItem"

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
        <UserGreeting />
        <CurrentDate />

        <div className="mt-6">
          <SearchItem />
        </div>

        {/* BUSCA RAPIDA */}
        <div className="no-scrollbar mt-6 flex gap-3 overflow-x-scroll">
          {quickOption.map((option) => (
            <Button
              className="gap-3 border bg-gray-950"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageurl}
                  alt={option.title}
                  width={16}
                  height={16}
                />
                <p className="text-white">{option.title}</p>
              </Link>
            </Button>
          ))}
        </div>

        {/* Imagem */}
        <div className="relative mt-6 h-1 w-full">
          {/**
          <Image
            src={banner}
            fill
            className="rounded-xl border border-solid border-white object-cover"
            alt="Agnede com os melhores com a cutify"
          />
           */}
        </div>

        {/* AGENDAMENTO 
        <BookingItem />
        */}

        {/* Reconmendados */}
        <h4 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          RECOMENDADOS
        </h4>
        <div className="no-scrollbar flex h-80 gap-4 overflow-auto">
          <BarberShopItems barbershops={barbershops} />
        </div>

        {/* POPULARES 
        <h4 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          POPULARES
        </h4>
        <div className="no-scrollbar flex h-80 gap-4 overflow-auto">
          <BarberShopItems barbershops={barbershops} />
        </div>
        */}
        <div className="flex h-full w-full flex-col bg-black py-4">
          <h4 className="ml-1 p-2 text-sm font-bold uppercase text-gray-400">
            SUGESTÕES
          </h4>

          <div className="flex flex-col items-center gap-4">
            <SugestItem
              titulo="Melhorar o visual"
              icon="selfcare.gif"
              descricao="Os melhores sempre disponíveis para si,
                        temos os melhores connosco, desde barbearias,
                        spas, até salões de esteticas"
              link="/detalhes"
            />
            <SugestItem
              titulo="Agende"
              descricao="Faça a sua marcação
               com antecedência 
               e relaxe no dia do
                seu tratamento"
              link="/detalhes"
              icon="calendar.png"
            />
            <SugestItem
              titulo="Localização"
              descricao="Não importa aonde está, nós mostramo-lhe os melhores perto de si."
              icon="location.png"
              link="/detalhes"
            />
          </div>
        </div>
      </div>
    </>
  )
}
