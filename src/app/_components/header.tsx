import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import Image from "next/image"
import logo from "../../../public/assets/logo_cutify/Logo-Final_invertido.png"
import {
  Book,
  BookAIcon,
  Calendar,
  HomeIcon,
  LogOut,
  MenuIcon,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetDescription,
  SheetTitle,
  SheetClose,
} from "./ui/sheet"
import quickOption from "../_constants/search"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image
          src={logo}
          alt="CUTIFY logo em letras brancas"
          height={120}
          width={120}
        />
        <Sheet>
          <SheetTrigger>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="bordr-b flex items-center gap-3 border-solid py-5">
              <Avatar>
                <AvatarImage
                  src="/assets/avatar.jpg"
                  alt="Foto de perfil do usuario"
                  width={36}
                  height={36}
                  className="rounded"
                />
                <AvatarFallback>CB</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-bold">Anderson Pedro</p>
                <p className="text-xs">anderson@devsembo.pt </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-b border-solid p-5">
              <SheetClose asChild>
                <Button className="justify-start gap-2" variant={"ghost"}>
                  <HomeIcon size={18} />
                  Inicio
                </Button>
              </SheetClose>
              <Button className="justify-start gap-2" variant={"ghost"}>
                <Calendar size={18} />
                Agendamentos
              </Button>
            </div>
            <div className="flex flex-col gap-4 border-b border-solid p-5">
              {quickOption.map((option) => (
                <Button
                  className="justify-start gap-2"
                  variant={"ghost"}
                  key={option.title}
                >
                  <Image
                    src={option.imageurl}
                    alt={option.imageurl}
                    width={18}
                    height={18}
                  />
                  {option.title}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-2 border-solid py-5">
              <Button variant={"outline"} className="gap-3 text-red-600">
                <LogOut size={18} color="red" />
                Terminar sessão
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
