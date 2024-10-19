// components/UserGreeting.tsx
"use client"

import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { Button } from "./ui/button"

export default function UserGreeting() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <h1 className="mb-4 mt-4 w-96 text-3xl">
        Agende sua marcação com a
        <span className="ml-3 font-light text-white">CUTIFY</span>
      </h1>
      <div className="mb-3 flex justify-between">
        <h2>
          Olá! <span className="text-xl font-semibold">{user?.nome || ""}</span>
        </h2>
      </div>
    </>
  )
}
