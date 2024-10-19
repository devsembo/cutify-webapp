"use client"
import React, { useState } from "react"
import { Input } from "../_components/ui/input"
import { SearchIcon } from "lucide-react"
import { Button } from "../_components/ui/button"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../_components/ui/form"

const formSchema = z.object({
  search: z
    .string()
    .min(1, { message: "pelo menos 1 caracteres." })
    .max(12, { message: "procure por palavras chaves" }),
})

function SearchItem() {
  type FormValues = z.infer<typeof formSchema>

  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const searchParams = new URLSearchParams({
      title: values.search,
    })
    router.push(`/barbershops?${searchParams.toString()}`)
  }
  return (
    <>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-5">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="w-full lg:w-[450px]">
                  <FormControl>
                    <Input
                      placeholder="Barbearia ou salão favorito"
                      className="bg-white text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button size="icon" type="submit">
              <SearchIcon />
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default SearchItem
