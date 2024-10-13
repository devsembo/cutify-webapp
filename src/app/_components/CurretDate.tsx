// components/CurrentWeekday.tsx
"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"

export default function CurrentDate() {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    // Atualiza a data à meia-noite
    const timer = setInterval(() => {
      const now = new Date()
      if (now.getDate() !== currentDate.getDate()) {
        setCurrentDate(now)
      }
    }, 1000 * 60) // Verifica a cada minuto

    return () => clearInterval(timer)
  }, [currentDate])

  const weekday = format(currentDate, "EEEE", { locale: ptBR })
  const formattedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1)

  return (
    <p>
      {formattedWeekday},{" "}
      {format(currentDate, "dd 'de' MMMM", { locale: ptBR })}
    </p>
  )
}
