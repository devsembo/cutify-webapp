import React from "react"
import { Card, CardContent } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Badge } from "./ui/badge"
import Image from "next/image"
import { StarIcon } from "lucide-react" // Certifique-se de importar o StarIcon se ainda não o fez

type BarberProps = {
  id: string
  nome: string
  totalAvaliacoes: number
  fotoPerfil: string
  mediaEstrelas?: number // Adicionado mediaEstrelas como opcional
}

interface BarberItemProps {
  barbeiro: BarberProps
  isSelected: boolean
  onToggle: () => void
}

function BarberItem({ barbeiro, isSelected, onToggle }: BarberItemProps) {
  return (
    <Card className="h-25" key={barbeiro.id}>
      <CardContent className="flex items-center justify-between gap-2 p-3">
        <div className="flex gap-3 text-white">
          <Image
            src={`http://localhost:3333/image/${barbeiro.fotoPerfil}`}
            alt={barbeiro.nome}
            width={50}
            height={50}
            className="rounded"
          />
          <div>
            <h1>{barbeiro.nome}</h1>
            {barbeiro.totalAvaliacoes > 0 ? (
              <p className="text-sm text-gray-400">
                {barbeiro.mediaEstrelas?.toFixed(1)}
                <StarIcon className="ml-1 inline text-yellow-400" size={14} />
                <span className="ml-1">
                  ({barbeiro.totalAvaliacoes}{" "}
                  {barbeiro.totalAvaliacoes === 1 ? "avaliação" : "avaliações"})
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-400">Ainda sem avaliações</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 text-white">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggle}
            className="h-6 w-6"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default BarberItem
