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
            <Link href={"/Our_services"} className="mt-[-18px] font-light">
              Como funciona as aplicações da CUTIFY
            </Link>
            <Link
              href={"https://www.livroreclamacoes.pt/"}
              target="_blank"
              className="mt-[-18px] font-light"
            >
              Livro de Reclamações
            </Link>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h4 className="text-xl font-semibold">Empresa</h4>
                <ul className="flex flex-col gap-4">
                  <Link href={"/about-us"}>
                    <li className="text-xs">Sobre nós</li>
                  </Link>
                  <Link href={"/our-offers"}>
                    <li className="text-xs">As nossas ofertas</li>
                  </Link>
                  <Link href={"/newsroom"}>
                    <li className="text-xs">Newsroom</li>
                  </Link>
                  <Link href={"/carrers"}>
                    <li className="text-xs">Junta-te a nós</li>
                  </Link>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Produtos</h3>
                <ul className="flex flex-col gap-4">
                  <Link href={"/mans-beauty"}>
                    <li className="text-xs">Beleza Masculina</li>
                  </Link>
                  <Link href={"/woman-beauty"}>
                    <li className="text-xs">Beleza Feminina</li>
                  </Link>
                  <Link href={"/self-care"}>
                    <li className="text-xs">Auto Cuidado</li>
                  </Link>
                  <Link href={"/brain-health"}>
                    <li className="text-xs">Saúde Mental</li>
                  </Link>
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
