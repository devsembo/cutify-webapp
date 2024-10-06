"use client"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { setupAPIClient } from "@/services/api"
import Image from "next/image"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import {
  ChevronLeftIcon,
  MapPinIcon,
  MenuIcon,
  StarIcon,
  TriangleAlert,
} from "lucide-react"

import BarberItem from "@/app/_components/barberItem"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog"
import SideBarSheet from "@/app/_components/sidebar-sheet"

interface Barbeiro {
  id: string
  nome: string
  totalAvaliacoes: number
  fotoPerfil: string
  mediaEstrelas: number
}

interface Barbearia {
  id: string
  nome: string
  endereco: string
  telefone: string
  fotoCapa: string
  mediaEstrelas: number
  totalAvaliacoes: number
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
  const [isLoading, setIsLoading] = useState(true)
  const [barbearia, setBarbearia] = useState<Barbearia | null>(null)
  const [selectedBarber, setSelectedBarber] = useState<string[]>([])
  const params = useParams()
  const barberiaId = params.id as string
  const alertTriggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const step = parseInt(searchParams.get("step") || "1")
    setStep(step)

    const servicos = searchParams.get("servicos")?.split(",") || []
    setAgendamento((prev) => ({ ...prev, servicos }))

    if (barberiaId) {
      fetchBarbearia()
      fetchBarbeiros()
    }
  }, [searchParams, barberiaId])

  async function fetchBarbearia() {
    if (!barberiaId) return

    const apiClient = setupAPIClient()
    try {
      const response = await apiClient.get(`/barbershop/detail`, {
        params: { BarberShop_ID: barberiaId },
      })
      setBarbearia(response.data)
    } catch (error) {
      console.error("Erro ao buscar dados da barbearia:", error)
    }
  }

  const toggleBarber = (barberID: string) => {
    setSelectedBarber((prev) =>
      prev.includes(barberID)
        ? prev.filter((id) => id !== barberID)
        : [...prev, barberID],
    )
  }

  async function fetchBarbeiros() {
    if (!barberiaId) return

    const apiClient = setupAPIClient()
    try {
      const response = await apiClient.get(`/barbers`, {
        params: { barbershop_id: barberiaId },
      })
      setBarbeiros(response.data)
    } catch (error) {
      console.error("Erro ao buscar barbeiros:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAgendarClick = () => {
    if (selectedBarber.length === 0) {
      alertTriggerRef.current?.click()
    } else {
      router.push(
        `/agendamento/${params.id}?step=1&servicos=${selectedBarber.join(",")}`,
      )
    }
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <>
      {/* Foto de Capa */}
      {barbearia && (
        <div className="relative h-[200px] w-full">
          <Image
            src={`http://localhost:3333/image/${barbearia.fotoCapa}`}
            alt={barbearia.nome}
            fill
            className="object-cover"
          />

          <Button
            size={"icon"}
            variant={"secondary"}
            className="absolute left-4 top-4 opacity-85"
            asChild
            onClick={() => router.back()}
          >
            <ChevronLeftIcon />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="absolute right-4 top-4 opacity-85"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SideBarSheet />
          </Sheet>
        </div>
      )}

      {/* Informações da Barbearia */}
      {barbearia && (
        <div className="border-b border-solid p-4">
          <h1 className="mb-2 text-xl font-bold">{barbearia.nome}</h1>
          <div className="mb-2 flex items-center gap-2">
            <MapPinIcon className="text-blue-600" size={16} />
            <p className="text-sm">{barbearia.endereco}</p>
          </div>
          <div className="flex items-center gap-2">
            <StarIcon className="text-yellow-400" size={16} />
            <p className="text-sm">
              {barbearia.mediaEstrelas.toFixed(1)}
              <span className="ml-2 text-gray-400">
                ({barbearia.totalAvaliacoes.toLocaleString("pt-BR")} avaliações)
              </span>
            </p>
          </div>
        </div>
      )}

      <div className="p-4">
        {step === 1 && (
          <>
            <h1 className="mb-4 text-2xl font-bold">Selecione um Barbeiro</h1>
            <div className="space-y-2">
              {barbeiros.map((barbeiro) => (
                <BarberItem
                  key={barbeiro.id}
                  barbeiro={barbeiro}
                  isSelected={selectedBarber.includes(barbeiro.nome)}
                  onToggle={() => toggleBarber(barbeiro.nome)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {/* Botão de agendar */}
      <div className="flex justify-center p-4">
        <Button onClick={handleAgendarClick} className="w-full max-w-md">
          Agendar
        </Button>
      </div>

      <AlertDialog>
        <AlertDialogTrigger ref={alertTriggerRef} className="hidden" />
        <AlertDialogContent className="w-80 justify-items-center rounded text-yellow-400">
          <AlertDialogHeader>
            <AlertDialogTitle className="justify-items-center">
              <TriangleAlert color="yellow" size={32} className="ml-[120px]" />
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              Você deve selecionar um barbeiro antes de agendar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="w-36">Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
