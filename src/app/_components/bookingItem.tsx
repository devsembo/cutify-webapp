import React from "react"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

function BookingItem() {
  return (
    <>
      <h4 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Proxima marcação
      </h4>
      <div className="w-full">
        <Card className="mt-3 bg-gray-950">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="h-6 w-fit bg-green-100 text-green-600">
                Confirmado
              </Badge>
              <h3 className="font-semibold">Corte de cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                  <AvatarImage
                    src="https://cutify-api-g5dk.onrender.com/image/e7139d5ad3-Captura de ecrÃ£ 2024-09-29 203401.png"
                    alt="Mike Pina Barbeiro da Classic BarberShop"
                  />
                  <AvatarFallback>CB</AvatarFallback>
                </Avatar>
                <p className="text-sm">Classic BarberShop</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Outubro</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">18:45</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default BookingItem
