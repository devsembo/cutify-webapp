import React from "react"
import { Card, CardContent } from "./ui/card"
import Link from "next/link"
import Image from "next/image"

function Footer() {
  return (
    <>
      <hr className="my-5 w-full" />
      <Card className="border-0">
        <CardContent className="flex flex-col justify-center px-5 py-6">
          <div className="flex flex-col gap-10">
            <Image
              src={"/assets/logo_cutify/Logo-Final_invertido.png"}
              alt="Logo Cutify"
              width={80}
              height={80}
            />

            <Link href={"help_center"} className="font-light">
              Visitar o nosso Centro de Ajuda
            </Link>
            <Link href={"help_center"} className="font-light">
              Como funciona as aplicações da CUTIFY
            </Link>
            <Link
              href={"https://www.livroreclamacoes.pt/"}
              target="_blank"
              className="mt-[-18px] font-light"
            >
              Livro de Reclamações
            </Link>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h4 className="text-xl">Empresa</h4>
                <ul className="flex flex-col gap-3">
                  <li className="text-sm">Sobre nós</li>
                  <li className="text-sm">As nossas ofertas</li>
                  <li className="text-sm">Newsroom</li>
                  <li className="text-sm">Investidores</li>
                  <li className="text-sm">Blogue</li>
                  <li className="text-sm">carreiras</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl">Produtos</h3>
                <ul className="flex flex-col gap-3">
                  <li className="text-sm">Beleza Masculina</li>
                  <li className="text-sm">Beleza Femenina</li>
                  <li className="text-sm">Auto Cuidado</li>
                  <li className="text-sm">Saúde Mental</li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6" />
          <p className="flex flex-row justify-center gap-2 text-sm text-gray-400">
            © 2024 Copyright
            <Link
              href={"https://cutify.com"}
              target="_blank"
              className="font-bold text-blue-700"
            >
              CUTIFY
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  )
}

export default Footer
