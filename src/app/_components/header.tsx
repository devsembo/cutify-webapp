import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import Image from "next/image"
import logo from "../../../public/assets/logo_cutify/Logo-Final_invertido.png"
import SideBarSheet from "./sidebar-sheet"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { MenuIcon } from "lucide-react"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="CUTIFY logo em letras brancas"
            height={100}
            width={100}
          />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SideBarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
