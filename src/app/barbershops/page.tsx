"use client"
import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "../_components/header"
import SearchItem from "../_components/SearchItem"
import BarberShopItems from "../_components/barbershop-itmes"
import { useBarberShops } from "../useBarberShops " // Vamos criar este hook

function BarberShopsContent() {
  const searchParams = useSearchParams()
  const title = searchParams.get("title")
  const service = searchParams.get("service")
  const { barberShops, isLoading } = useBarberShops(title, service)

  const searchTerm = title || service

  return (
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
  )
}

export default function BarberShopsPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <BarberShopsContent />
    </Suspense>
  )
}
