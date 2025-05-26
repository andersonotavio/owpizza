"use client"

import { useCart } from "@/store/cart"
import { Button } from "../ui/button"

export const CartEmpty = () => {
  const { setOpen } = useCart();
  return (
    <div className="my-10 text-center">
      <p>Carrinho Vazio</p>
      <Button className="mt-5 cursor-pointer" onClick={() => setOpen(false)}>Fechar</Button>
    </div>
  )
}