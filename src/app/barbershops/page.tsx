"use client"
import React, { useEffect, useState, Suspense } from "react"
import { setupAPIClient } from "@/services/api"
import BarberShopItems from "../_components/barbershop-itmes"
import Header from "../_components/header"
import SearchItem from "../_components/SearchItem"
import { useSearchParams } from "next/navigation"

type BarbershopProps = {
  id: string
  nome: string
  endereco: string
  telefone: string
  fotoCapa: string
  mediaEstrelas: number
}

export default function BarberShopsPage() {
  const [barberShops, setBarberShops] = useState<BarbershopProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const title = searchParams.get("title")
  const service = searchParams.get("service")

  useEffect(() => {
    async function fetchBarberShops() {
      setIsLoading(true)
      try {
        const apiClient = setupAPIClient()
        const response = await apiClient.get<BarbershopProps[]>("/barbershop", {
          params: {
            title,
            service,
          },
        })
        setBarberShops(response.data)
      } catch (error) {
        console.error("Erro ao buscar barbearias:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (title || service) {
      fetchBarberShops()
    }
  }, [title, service])

  const searchTerm = title || service

  return (
    <>
      <Suspense fallback={<div>Carregando...</div>}>
        <div>
          <Header />
          <div className="my-6">
            <SearchItem />
          </div>

          {searchTerm ? (
            <>
              <h3 className="p-3 font-bold text-gray-400">
                Resultados para: {searchTerm}
              </h3>
              {isLoading ? (
                <p>Carregando resultados...</p>
              ) : barberShops.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  <BarberShopItems barbershops={barberShops} />
                </div>
              ) : (
                <p className="mt-28 p-5 text-gray-500">
                  Nenhum resultado encontrado para &quot;{searchTerm}&quot;.
                </p>
              )}
            </>
          ) : (
            <h3>Digite algo para pesquisar barbearias</h3>
          )}
        </div>
      </Suspense>
    </>
  )
}
