// components/UserGreeting.tsx
"use client"

import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"

export default function UserGreeting() {
  const { user } = useContext(AuthContext)

  return (
    <h2>
      Olá, <span className="text-xl font-semibold">{user?.nome || ""}</span>
    </h2>
  )
}
