import React from "react"
import { Card, CardContent, CardTitle } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

interface SugestProps {
  titulo: string
  icon: string
  descricao: string
  link: string
}

function SugestItem({ titulo, icon, descricao, link }: SugestProps) {
  return (
    <>
      <Card className="flex h-36 w-[350px] flex-row items-center border-0 bg-gray-900">
        <CardContent className="mt-5 flex flex-col gap-1">
          <h1 className="text-sm font-semibold text-white">{titulo}</h1>
          <p className="w-52 text-xs font-light text-white">{descricao}</p>
          <Button asChild className="mt-1 h-8 w-20 rounded-2xl">
            <Link href={`${link}`}>Detalhes</Link>
          </Button>
        </CardContent>
        <div className="h-10">
          <Image
            src={`/assets/icons/${icon}`}
            alt={icon}
            width={100}
            height={50}
          />
        </div>
      </Card>
    </>
  )
}

export default SugestItem
