"use client"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { parseCookies } from "nookies"

import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react"
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

import { AuthContext } from "@/contexts/AuthContext"

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

export default function AgendamentoPage() {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([])
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
  const [selectedServices, setSelectedServices] = useState<Servico[]>([])
  const MemoizedBarberItem = React.memo(BarberItem)

  useEffect(() => {
    const cookies = parseCookies()
    const token = cookies["@cutifywebtoken.token"]
    if (!token) {
      router.push("/login")
    }
  }, [])

  useEffect(() => {
    const servicosIds = searchParams.get("servicos")?.split(",") || []
    const precos = searchParams.get("precos")?.split(",") || []
    const nomes = searchParams.get("nome")?.split(",") || []

    const servicosRecebidos = servicosIds.map((id, index) => ({
      id,
      nome: nomes[index] || ` ${index + 1}`,
      preco: parseFloat(precos[index] || "0"),
    }))

    setSelectedServices(servicosRecebidos)
  }, [searchParams])

  const fetchBarbearia = useCallback(async () => {
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
  }, [barberiaId])

  const fetchBarbeiros = useCallback(async () => {
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
  }, [barberiaId])

  useEffect(() => {
    const step = parseInt(searchParams.get("step") || "1")
    setStep(step)

    if (barberiaId) {
      fetchBarbearia()
      fetchBarbeiros()
    }
  }, [searchParams, barberiaId, fetchBarbearia, fetchBarbeiros])

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
    if (date) {
      TimeList(date)
    }
  }

  const handleSelectedTime = (hora: string) => {
    setSelectedTime((prev) => (prev === hora ? null : hora))
  }

  const toggleBarber = (barberID: string) => {
    setSelectedBarber((prev) =>
      prev.includes(barberID)
        ? prev.filter((id) => id !== barberID)
        : [...prev, barberID],
    )
  }

  const TimeList = useCallback(
    async (selectedDate: Date) => {
      const apiClient = setupAPIClient()
      try {
        const formattedDate = selectedDate.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        const response = await apiClient.get("/horas", {
          params: {
            data: formattedDate,
            barbeiro_id: selectedBarber[0],
          },
        })
        setHorasDisponiveis(response.data)
      } catch (error) {
        console.error("Erro ao buscar horas disponíveis:", error)
        setHorasDisponiveis([])
      }
    },
    [selectedBarber],
  )

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

  async function handleAppointment() {
    if (
      !barbearia?.id ||
      !selectedDay ||
      !selectedTime ||
      !selectedBarber ||
      selectedBarber.length === 0 ||
      !selectedServices ||
      selectedServices.length === 0 ||
      !user?.id
    ) {
      alert(
        "Por favor, preencha todos os campos necessários para o agendamento.",
      )
      return
    }

    const appointmentData = {
      barbeariaId: barbearia.id,
      data: selectedDay.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      hora: selectedTime,
      servicoIds: selectedServices.map((service) => service.nome), // Envie apenas os IDs dos serviços
      barbeiroId: selectedBarber[0],
      usuarioId: user.id,
    }

    const apiClient = setupAPIClient()
    try {
      const response = await apiClient.post("/appointment", appointmentData)
      alert("Agendamento feito com sucesso!")
    } catch (error) {
      alert("Ops! Algo deu errado. Por favor, tente novamente.")
    }
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      {/* Foto de Capa */}
      {barbearia && (
        <div className="relative h-[200px] w-full">
          <Image
            src={`https://cutify-api-sv8s.onrender.com/image/${barbearia.fotoCapa}`}
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
                <MemoizedBarberItem
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
          <SheetContent
            onCloseAutoFocus={closeSheet}
            className="w-[85%] overflow-y-auto px-0"
          >
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
                    {horasDisponiveis.map((horaObj, index) => (
                      <Button
                        key={index}
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
                <div className="ml-2.5 flex h-auto w-80 flex-col gap-2 rounded border border-solid bg-zinc-950 p-3 text-white">
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
                        {selectedDay.toLocaleDateString("pt-pt")}
                      </span>
                    </p>
                  )}
                  {selectedTime && (
                    <p className="flex justify-between text-sm text-gray-600">
                      Hora: <span className="text-white">{selectedTime}</span>
                    </p>
                  )}
                  {selectedBarber && barbeiros.length > 0 && (
                    <p className="flex justify-between text-sm text-gray-600">
                      Barbeiro:{" "}
                      <span className="text-white">
                        {
                          barbeiros.find((b) => b.id === selectedBarber[0])
                            ?.nome
                        }
                      </span>
                    </p>
                  )}

                  <div>
                    <p className="text-sm">Serviços:</p>
                  </div>
                  {selectedServices.map((servico) => (
                    <div
                      key={servico.nome}
                      className="ml-5 flex justify-between text-sm"
                    >
                      <span className="text-gray-600">{servico.id}</span>
                      <span className="text-white">
                        €{servico.preco.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="mt-2 border-t border-gray-600 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total:</span>
                      <span className="text-white">
                        €
                        {selectedServices
                          .reduce((total, servico) => total + servico.preco, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTime && (
              <div className="flex h-24 w-full items-center justify-center">
                <Button
                  className="w-56 rounded-3xl bg-fuchsia-700 uppercase text-white"
                  onClick={handleAppointment}
                  disabled={!selectedDay || !selectedTime}
                >
                  Agendar
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

      <AlertDialog>
        <AlertDialogTrigger ref={alertTriggerRef} className="hidden" />
        <AlertDialogContent className="w-80 justify-items-center rounded text-yellow-400">
          <AlertDialogHeader>
            <AlertDialogTitle>
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
    </Suspense>
  )
}
