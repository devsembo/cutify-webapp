"use client"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { setupAPIClient } from "@/services/api"
import Image from "next/image"
import { Button } from "@/app/_components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet"

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
import { Calendar } from "@/app/_components/ui/calendar"
import { pt } from "date-fns/locale"

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

interface Servico {
  id: string
  nome: string
  preco: number
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
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([])
  const [servicos, setServicos] = useState<Servico[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [barbearia, setBarbearia] = useState<Barbearia | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedBarber, setSelectedBarber] = useState<string[]>([])
  const params = useParams()
  const barberiaId = params.id as string
  const alertTriggerRef = useRef<HTMLButtonElement>(null)

  const [horasDisponiveis, setHorasDisponiveis] = useState<{ hora: string }[]>(
    [],
  )
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)

  const [selectedServices, setSelectedServices] = useState<string[]>([])

  useEffect(() => {
    const servicos = searchParams.get("servicos")
    if (servicos) {
      setSelectedServices(servicos.split(","))
    }
  }, [searchParams])

  useEffect(() => {
    const step = parseInt(searchParams.get("step") || "1")
    setStep(step)

    if (barberiaId) {
      fetchBarbearia()
      fetchBarbeiros()
    }
  }, [searchParams, barberiaId])

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
    if (date) {
      TimeList(date)
    }
  }

  const handleSelectedTime = (hora: string) => {
    setSelectedTime((prev) => (prev === hora ? null : hora))
  }

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

  async function fetchServicos() {
    const apiClient = setupAPIClient()
    try {
      const response = await apiClient.get(`/servico`, {
        params: { barbershop_id: barberiaId },
      })
      setServicos(response.data)
    } catch (error) {
      console.error("Erro ao buscar barbeiros:", error)
    } finally {
      setIsLoading(false)
    }
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

  async function TimeList(selectedDate: Date) {
    const apiClient = setupAPIClient()
    try {
      const formattedDate = `${selectedDate.getDate().toString().padStart(2, "0")}-${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}-${selectedDate.getFullYear()}`
      const response = await apiClient.get("/horas", {
        params: {
          data: formattedDate,
          barbeiro_id: "a3525899-ecb6-411f-9221-5ebee06873f9", // Use the selected barber if available
        },
      })
      setHorasDisponiveis(response.data)
    } catch (error) {
      console.error("Erro ao buscar horas disponíveis:", error)
      setHorasDisponiveis([])
    }
  }

  const handleAgendarClick = () => {
    if (selectedBarber.length === 0) {
      alertTriggerRef.current?.click()
    } else {
      setIsSheetOpen(true)
    }
  }

  const closeSheet = () => {
    setIsSheetOpen(false)
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <>
      {/* Foto de Capa */}
      {barbearia && (
        <div className="relative h-[200px] w-full">
          <Image
            src={`http://192.168.1.81:3333/image/${barbearia.fotoCapa}`}
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
                  isSelected={selectedBarber.includes(barbeiro.id)}
                  onToggle={() => toggleBarber(barbeiro.id)}
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

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent onCloseAutoFocus={closeSheet} className="w-[85%] px-0">
            <SheetHeader>
              <SheetTitle>Agendar serviço</SheetTitle>
            </SheetHeader>
            <div className="border-b border-solid py-5">
              <Calendar
                mode="single"
                locale={pt}
                selected={selectedDay}
                onSelect={handleDateSelect}
                modifiersStyles={{
                  selected: {
                    backgroundColor: "purple",
                    color: "white",
                  },
                }}
                styles={{
                  head_cell: {
                    width: "100%",
                    textTransform: "capitalize",
                  },
                  cell: {
                    width: "100%",
                  },
                  button: {
                    width: "100%",
                  },
                  nav_button_previous: {
                    width: "32px",
                    height: "32px",
                  },
                  nav_button_next: {
                    width: "32px",
                    height: "32px",
                  },
                  caption: {
                    textTransform: "capitalize",
                    color: "purple",
                  },
                }}
              />
            </div>

            {selectedDay && (
              <div className="overflow-y- scrollbar-thin no-scrollbar overflow-x-auto border-b border-solid">
                {horasDisponiveis.length > 0 ? (
                  <div className="flex min-w-max gap-3 p-3">
                    {horasDisponiveis.map((horaObj) => (
                      <Button
                        key={horaObj.hora}
                        variant="outline"
                        className={`flex-shrink-0 whitespace-nowrap rounded-full transition-colors ${
                          selectedTime === horaObj.hora
                            ? "bg-fuchsia-800 text-white hover:bg-fuchsia-800"
                            : "hover:bg-purple-100"
                        }`}
                        onClick={() => handleSelectedTime(horaObj.hora)}
                      >
                        {horaObj.hora}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="p-5 text-sm">
                    Nenhum horário disponível para esta data.
                  </p>
                )}
              </div>
            )}
            {selectedTime && (
              <div className="mt-12 flex flex-col items-center justify-center">
                <div className="ml-2.5 h-auto w-80 rounded border border-solid bg-zinc-950 p-3 text-white">
                  <h3 className="mb-2 font-sans text-sm">
                    Resumo do Agendamento
                  </h3>
                  {barbearia && (
                    <p className="flex justify-between text-sm text-gray-600">
                      Barbearia:{" "}
                      <span className="text-white">{barbearia.nome}</span>
                    </p>
                  )}
                  {selectedDay && (
                    <p className="flex justify-between text-sm text-gray-600">
                      Data:{" "}
                      <span className="text-white">
                        {selectedDay.toLocaleDateString("pt-BR")}
                      </span>
                    </p>
                  )}
                  {selectedTime && (
                    <p className="flex justify-between text-sm text-gray-600">
                      Hora: <span className="text-white">{selectedTime}</span>
                    </p>
                  )}
                  {searchParams.get("servicos") && (
                    <>
                      <p className="flex justify-between text-sm text-gray-600">
                        Serviços:
                      </p>
                      <ul className="list-inside list-disc">
                        {searchParams
                          .get("servicos")
                          ?.split(",")
                          .map((service, index) => (
                            <li
                              key={index}
                              className="ml-5 flex justify-between text-sm text-gray-600"
                            >
                              {service}
                            </li>
                          ))}
                      </ul>
                    </>
                  )}
                  {selectedBarber && barbeiros.length > 0 && (
                    <p className="ml-5 flex justify-between text-sm text-gray-600">
                      Barbeiro:{" "}
                      <span className="text-white">
                        {
                          barbeiros.find((b) => b.id === selectedBarber[0])
                            ?.nome
                        }
                      </span>
                    </p>
                  )}

                  <p>{}</p>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
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
