import React from "react"
import { Card, CardContent } from "./ui/card"
import Link from "next/link"

function Footer() {
  return (
    <>
      <Card>
        <CardContent className="px-5 py-6">
          <p className="text-sm text-gray-400">
            © 2024 Copyright{" "}
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
