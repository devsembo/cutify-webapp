import React from "react"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import banner from "../../public/assets/banner.png"
export default function Home() {
  return (
    <>
      <Header />
      <div className="p-5">
        <h2>
          Olá, <span className="text-xl font-bold">Anderson!</span>
        </h2>
        <p>Segunda-feira, 30 de Outubro.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Pesquisa" className="text-white" />
          <Button size="icon">
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src={banner}
            fill
            className="rounded-xl border border-solid border-white object-cover"
            alt="Agnede com os melhores com a cutify"
          />
        </div>
      </div>
    </>
  )
}
