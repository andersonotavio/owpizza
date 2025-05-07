"use client"

import Link from "next/link"

export function Header(){
  return (
    <header className="conatiner mx-auto flex my-4 p-5 items-center justify-between bg-secondary rounded-md">
      <Link href="/" >
        <div className="text-2xl font-bold">Owpizza</div>
      </Link>
      <div className="flex gap-2">
        <button>login / cadastro</button>
        <button>carrinho</button>
      </div>
    </header>
  )
}