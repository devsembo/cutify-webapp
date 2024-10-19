import React from "react"
import { Card, CardContent } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Badge } from "./ui/badge"

type ServiceProps = {
  id: string
  nome: string
  preco: number
  descricao: string
  duracao: string
}

interface ServiceItemProps {
  servico: ServiceProps
  isSelected: boolean
  onToggle: () => void
}

function ServiceItem({ servico, isSelected, onToggle }: ServiceItemProps) {
  return (
    <Card className="h-28" key={servico.id}>
      <CardContent className="flex items-center justify-between gap-2">
        <div className="text-white">
          <h1>{servico.nome}</h1>
          <p className="mb-1 w-64 text-sm text-gray-400">{servico.descricao}</p>
          <p className="truncate text-xs text-blue-400">
            duração: {servico.duracao} min, com o tempo de espera.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 text-white">
          <Badge>
            <p className="text-xs">
              {Intl.NumberFormat("pt-pt", {
                style: "currency",
                currency: "EUR",
              }).format(Number(servico.preco))}
            </p>
          </Badge>
          <Checkbox checked={isSelected} onCheckedChange={onToggle} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
