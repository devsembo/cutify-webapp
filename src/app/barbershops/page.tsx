"use client"
import React, { useEffect, useState } from "react"
import { setupAPIClient } from "@/services/api"
import BarberShopItems from "../_components/barbershop-itmes"
import Header from "../_components/header"
import SearchItem from "../_components/SearchItem"

interface BarberShopsPageProps {
  searchParams: {
    search?: string
  }
}

type BarbershopProps = {
  id: string
  nome: string
  endereco: string
  telefone: string
  fotoCapa: string
  mediaEstrelas: number
}

export default function BarberShopsPage({
  searchParams,
}: BarberShopsPageProps) {
  const [barberShops, setBarberShops] = useState<BarbershopProps[]>([])
  const search = searchParams.search || ""
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchBarberShops() {
      try {
        const apiClient = setupAPIClient()
        const response = await apiClient.get<BarbershopProps[]>("/babershop", {
          params: { search },
        })
        setBarberShops(response.data)
      } catch (error) {
        console.error("Erro ao buscar barbearias:", error)
      }
    }

    fetchBarberShops()
  }, [search])

  return (
    <>
      <div>
        <Header />
        <div className="my-6">
          <SearchItem />
        </div>

        {search.length > 0 ? (
          <>
            <h3 className="p-3 font-bold text-gray-400">
              Resultados para: {search}
            </h3>
            {isLoading ? (
              <p>Carregando resultados...</p>
            ) : barberShops.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                <BarberShopItems barbershops={barberShops} />
              </div>
            ) : (
              <p className="mt-28 p-5 text-gray-500">
                Nenhuma resultado encontrado para &quot;{searchParams.search}
                &quot;.
              </p>
            )}
          </>
        ) : (
          <h3>Digite algo para pesquisar barbearias</h3>
        )}
      </div>
    </>
  )
}
