"use client"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { setupAPIClient } from "@/services/api"
import { Button } from "@/app/_components/ui/button"

interface Barbeiro {
  id: string
  nome: string
}

interface Agendamento {
  servicos: string[]
  barbeiroId: string | null
  data: string | null
  hora: string | null
}

export default function AgendamentoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [agendamento, setAgendamento] = useState<Agendamento>({
    servicos: [],
    barbeiroId: null,
    data: null,
    hora: null,
  })
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([])
  const [datasDisponiveis, setDatasDisponiveis] = useState<string[]>([])
  const [horasDisponiveis, setHorasDisponiveis] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const barberiaId = searchParams.get("id")

  useEffect(() => {
    const step = parseInt(searchParams.get("step") || "1")
    setStep(step)

    const servicos = searchParams.get("servicos")?.split(",") || []
    setAgendamento((prev) => ({ ...prev, servicos }))

    if (step === 1) {
      fetchBarbeiros()
    }
  }, [searchParams])

  async function fetchBarbeiros() {
    if (!barberiaId) return

    const apiClient = setupAPIClient()
    try {
      const response = await apiClient.get(`/barbeiros`, {
        params: { barbershop_id: barberiaId },
      })
      setBarbeiros(response.data)
    } catch (error) {
      console.error("Erro ao buscar barbeiros:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchDatasDisponiveis() {
    // Implemente a lógica para buscar datas disponíveis
    // Este é um exemplo simplificado
    setDatasDisponiveis(["2023-06-01", "2023-06-02", "2023-06-03"])
  }

  async function fetchHorasDisponiveis() {
    // Implemente a lógica para buscar horas disponíveis
    // Este é um exemplo simplificado
    setHorasDisponiveis(["09:00", "10:00", "11:00", "14:00", "15:00"])
  }

  const handleBarbeiroSelect = (barbeiroId: string) => {
    setAgendamento((prev) => ({ ...prev, barbeiroId }))
    setStep(2)
    fetchDatasDisponiveis()
  }

  const handleDataSelect = (data: string) => {
    setAgendamento((prev) => ({ ...prev, data }))
    setStep(3)
    fetchHorasDisponiveis()
  }

  const handleHoraSelect = (hora: string) => {
    setAgendamento((prev) => ({ ...prev, hora }))
    setStep(4)
  }

  const handleConfirmar = async () => {
    // Implemente a lógica para confirmar o agendamento
    console.log("Agendamento confirmado:", agendamento)
    // Faça uma chamada à API para salvar o agendamento
    // Redirecione para uma página de confirmação
    router.push("/agendamento-confirmado")
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <div className="p-4">
      {step === 1 && (
        <>
          <h1 className="mb-4 text-2xl font-bold">Selecione um Barbeiro</h1>
          <div className="space-y-2">
            {barbeiros.map((barbeiro) => (
              <div
                key={barbeiro.id}
                className={`cursor-pointer rounded border p-2 ${agendamento.barbeiroId === barbeiro.id ? "bg-blue-100" : ""}`}
                onClick={() => handleBarbeiroSelect(barbeiro.id)}
              >
                {barbeiro.nome}
              </div>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="mb-4 text-2xl font-bold">Selecione uma Data</h1>
          <div className="space-y-2">
            {datasDisponiveis.map((data) => (
              <div
                key={data}
                className={`cursor-pointer rounded border p-2 ${agendamento.data === data ? "bg-blue-100" : ""}`}
                onClick={() => handleDataSelect(data)}
              >
                {data}
              </div>
            ))}
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h1 className="mb-4 text-2xl font-bold">Selecione um Horário</h1>
          <div className="space-y-2">
            {horasDisponiveis.map((hora) => (
              <div
                key={hora}
                className={`cursor-pointer rounded border p-2 ${agendamento.hora === hora ? "bg-blue-100" : ""}`}
                onClick={() => handleHoraSelect(hora)}
              >
                {hora}
              </div>
            ))}
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h1 className="mb-4 text-2xl font-bold">Confirmar Agendamento</h1>
          <div className="space-y-2">
            <p>Serviços: {agendamento.servicos.join(", ")}</p>
            <p>
              Barbeiro:{" "}
              {barbeiros.find((b) => b.id === agendamento.barbeiroId)?.nome}
            </p>
            <p>Data: {agendamento.data}</p>
            <p>Hora: {agendamento.hora}</p>
          </div>
          <Button onClick={handleConfirmar} className="mt-4 w-full">
            Confirmar Agendamento
          </Button>
        </>
      )}
    </div>
  )
}
