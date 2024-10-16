import { useState, useEffect } from "react"
import { setupAPIClient } from "@/services/api"

export function useBarberShops(title: string | null, service: string | null) {
  const [barberShops, setBarberShops] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchBarberShops() {
      if (!title && !service) return

      setIsLoading(true)
      try {
        const apiClient = setupAPIClient()
        const response = await apiClient.get("/barbershop", {
          params: { title, service },
        })
        setBarberShops(response.data)
      } catch (error) {
        console.error("Erro ao buscar barbearias:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBarberShops()
  }, [title, service])

  return { barberShops, isLoading }
}
