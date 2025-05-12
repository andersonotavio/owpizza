"use client"

import Link from "next/link"
import { Button } from "../ui/button"

export function Header(){
  return (
    <header className="conatiner mx-auto flex my-4 p-5 items-center justify-between bg-secondary rounded-md">
      <Link href="/" >
        <div className="text-2xl font-bold">Owpizza</div>
      </Link>
      <div className="flex gap-2">
        <Button className="cursor-pointer">Login/Cadastro</Button>
        <Button className="cursor-pointer">carrinho</Button>
      </div>
    </header>
  )
}