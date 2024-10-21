"use client"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import Image from "next/image"
import logo from "../../../public/assets/logo_cutify/Logo-Final_invertido.png"
import SideBarSheet from "./sidebar-sheet"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { AuthContext } from "@/contexts/AuthContext"
import { parseCookies } from "nookies"
import { Badge } from "./ui/badge"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"

export default function Header() {
  const cookies = parseCookies()
  const { user } = useContext(AuthContext)
  const token = cookies["@cutifywebtoken.token"]
  const router = useRouter()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const closeSheet = () => {
    setIsSheetOpen(false)
  }

  function handleSignIn() {
    router.push("/login")
  }

  function handleSignUp() {
    router.push("/signup")
  }

  return (
    <>
      <Card className="border-0">
        <CardContent className="flex flex-row items-center justify-between p-3">
          <Link href={"/"}>
            <Image
              src={logo}
              alt="CUTIFY logo em letras brancas"
              height={70}
              width={70}
            />
          </Link>

          <div className="flex items-center justify-between">
            {!token && (
              <div className="flex items-center gap-2">
                <Button
                  variant={"outline"}
                  className="h-[28px] w-24 text-xs"
                  onClick={handleSignIn}
                >
                  Iniciar sessão
                </Button>
              </div>
            )}
            {token && (
              <Button className="h-7 rounded-3xl">
                <Link href={"/profile"}>{user?.nome}</Link>
              </Button>
            )}

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild className="] border-0">
                <Button size="icon" variant="outline">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SideBarSheet onClose={closeSheet} />
            </Sheet>
          </div>
        </CardContent>
      </Card>
      <hr className="border-1 mt-2" />
    </>
  )
}
