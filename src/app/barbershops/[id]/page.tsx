"use client"
import { setupAPIClient } from "@/services/api"
import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/app/_components/ui/button"
import {
  ChevronLeftIcon,
  Copy,
  MapPinIcon,
  MenuIcon,
  SmartphoneIcon,
  StarIcon,
  TriangleAlert,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ServiceItem from "@/app/_components/serviceItem"

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

import { toast } from "sonner"

interface Barbearia {
  id: string
  nome: string
  endereco: string
  telefone: string
  fotoCapa: string
  mediaEstrelas: number
  totalAvaliacoes: number
  descricao: string
}

interface Servico {
  id: string
  nome: string
  preco: number
  descricao: string
  duracao: string
}

interface BarberiaData {
  barbearia: Barbearia
  servicos: Servico[]
}

type Params = {
  id: string
}

async function getData(id: string): Promise<BarberiaData> {
  const apiClient = setupAPIClient()

  try {
    const [barberiaResponse, servicosResponse] = await Promise.all([
      apiClient.get(`/barbershop/detail`, {
        params: {
          BarberShop_ID: id,
        },
      }),
      apiClient.get(`/servico`, {
        params: {
          barbershop_id: id,
        },
      }),
    ])

    const barbearia: Barbearia = barberiaResponse.data
    const servicos: Servico[] = servicosResponse.data

    return { barbearia, servicos }
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export default function BarberShopPage({ params }: { params: Params }) {
  const [barberiaData, setBarberiaData] = useState<BarberiaData | null>(null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const alertTriggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(params.id)
        setBarberiaData(data)
      } catch (err) {
        console.error("Erro detalhado:", err)
        setError("Falha ao carregar os dados da barbearia.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [params.id])

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId],
    )
  }

  const handleAgendarClick = () => {
    if (selectedServices.length === 0) {
      alertTriggerRef.current?.click()
    } else {
      router.push(
        `/agendamento/${params.id}?step=1&servicos=${selectedServices.join(",")}`,
      )
    }
  }

  function handleCopyPhone(phone: string) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(phone)
    } else {
      fallbackCopyTextToClipboard(phone)
    }
  }

  function fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement("textarea")
    textArea.value = text

    textArea.style.top = "0"
    textArea.style.left = "0"
    textArea.style.position = "fixed"

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand("copy")
      const msg = successful ? "bem-sucedido" : "malsucedido"
      toast.success("copiado para area de transferência")
    } catch (err) {
      toast.error("ops! algo correu mal.")
    }

    document.body.removeChild(textArea)
  }

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>{error}</div>
  if (!barberiaData) return <div>Nenhum dado encontrado</div>

  const { barbearia, servicos } = barberiaData
  const numeroFormatado = barbearia.totalAvaliacoes.toLocaleString("pt-PT")

  return (
    <>
      {/* Foto de Capa */}
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
        >
          <Link href={"/"}>
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Button
          size={"icon"}
          variant={"secondary"}
          className="absolute right-4 top-4 opacity-85"
        >
          <MenuIcon />
        </Button>
      </div>

      {/* Titulo (nome e endereço da barbearia) */}
      <div className="border-b border-solid p-5">
        <h1 className="mb-4 text-xl font-bold">{barbearia.nome}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-blue-600" size={16} />
          <p className="text-sm">{barbearia.endereco}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="text-yellow-400" size={16} />
          <p className="text-sm">
            {barbearia.mediaEstrelas}{" "}
            <span className="ml-2 text-gray-400">
              ({numeroFormatado} avaliações)
            </span>
          </p>
        </div>
      </div>

      {/* descrição da barbearia */}
      <div className="space-y-2 border-b border-solid p-2">
        <h2 className="text-sm font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-xs text-gray-400">
          {barbearia.descricao}
        </p>
      </div>

      {/* Serviços Seccion */}
      <div className="space-y-2 border-b border-solid p-2">
        <h2 className="text-sm font-bold uppercase text-gray-400">Serviços</h2>
        {servicos.map((servico) => (
          <ServiceItem
            key={servico.id}
            servico={servico}
            isSelected={selectedServices.includes(servico.nome)}
            onToggle={() => toggleService(servico.nome)}
          />
        ))}
      </div>

      {/* Botão de agendar */}
      <div className="flex justify-center p-4">
        <Button onClick={handleAgendarClick} className="w-full max-w-md">
          Agendar
        </Button>
      </div>

      {/* Contactos */}
      <div className="flex justify-between p-5">
        <div className="flex items-center gap-2">
          <SmartphoneIcon />
          <p>{barbearia.telefone}</p>
        </div>
        <Button
          variant={"outline"}
          className="gap-1 text-xs"
          onClick={() => handleCopyPhone(barbearia.telefone)}
        >
          <Copy size={16} />
          Copiar
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
              Você deve selecionar pelo menos um serviço antes de agendar.
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
