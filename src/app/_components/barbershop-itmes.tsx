"use client"
import React from "react"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

type BarbershopProps = {
  id: string
  nome: string
  endereco: string
  telefone: string
  fotoCapa: string
  mediaEstrelas: number
}

interface BarberShopItemsProps {
  barbershops: BarbershopProps[]
}

function BarberShopItems({ barbershops }: BarberShopItemsProps) {
  return (
    <>
      {barbershops.map((barbershop) => (
        <Card
          className="mt-3 h-72 w-48 max-w-full bg-gray-950"
          key={barbershop.id}
        >
          <CardContent className="flex flex-col p-0">
            <div className="relative h-[159px]">
              <Image
                src={`http://192.168.1.81:3333/image/${barbershop.fotoCapa}`}
                alt={barbershop.fotoCapa}
                width={500}
                height={300}
                className="h-40 rounded-2xl object-cover p-1"
              />

              <Badge
                className="absolute left-2 top-2 z-50 space-x-1 bg-gray-800 opacity-70"
                variant={"secondary"}
              >
                <StarIcon size={16} className="fill-yellow-500 text-primary" />
                <p className="text-xs font-semibold">
                  {barbershop.mediaEstrelas}
                </p>
              </Badge>
            </div>
            <div className="py-3">
              <p className="w-full truncate p-1 text-sm font-semibold text-white">
                {barbershop.nome}
              </p>
              <p className="mb-2 truncate p-1 text-xs text-gray-500">
                {barbershop.endereco}
              </p>
              <div className="flex w-full items-center justify-center">
                <Button
                  className="flex h-8 w-40 items-center justify-center bg-gray-800 text-sm text-white"
                  asChild
                >
                  <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default BarberShopItems
