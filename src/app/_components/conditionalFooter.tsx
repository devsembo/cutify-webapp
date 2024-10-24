"use client"
import React from "react"
import { usePathname } from "next/navigation"
import Footer from "./footer"

function ConditionalFooter() {
  const pathname = usePathname()

  // Não renderiza o Footer na página de login
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/profile" ||
    pathname === "/edit_profile"
  ) {
    return null
  }

  return <Footer />
}

export default ConditionalFooter
