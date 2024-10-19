"use client"
import React, { useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/app/_components/ui/alert-dialog"

const CookieConsent = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) {
      setIsOpen(true)
    }
  }, [])

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setIsOpen(false)
  }

  const handleDeclineCookies = () => {
    localStorage.setItem("cookieConsent", "declined")
    setIsOpen(false)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Não precisa de AlertDialogTrigger pois o estado abre o diálogo */}
      {isOpen && (
        <AlertDialogContent className="h-64 w-[90%] rounded">
          <AlertDialogHeader>
            <AlertDialogTitle>Politicia de cookies</AlertDialogTitle>
            <AlertDialogDescription>
              Nós usamos cookies para melhorar sua experiência. Você aceita?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col items-center gap-3">
            <AlertDialogAction
              className="h-8 w-24 border bg-black text-white"
              onClick={handleDeclineCookies}
            >
              Recusar
            </AlertDialogAction>
            <AlertDialogAction
              className="h-8 w-24 bg-white"
              onClick={handleAcceptCookies}
            >
              Aceitar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  )
}

export default CookieConsent
