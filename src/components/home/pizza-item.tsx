"use client"

import { Product } from "@/generated/prisma"
import Image from "next/image"
import { Button } from "../ui/button"
import { decimalToMoney } from "@/lib/utils"
import { useCart } from "@/store/cart"

type Props ={
  data: Product
}

export const PizzaItem = ({data}: Props) => {
  const cart = useCart();

  function handleAddToCart() {
    cart.addItem({
      productId: data.id,
      quantity: 1
    })
    cart.setOpen(true);
  }

  return (
    <div className="text-sm bg-secondary p-4 rounded-md">
      <Image 
        src={data.image}
        alt={data.name}
        width={200}
        height={200}
        className="w-full mb-3"
      />
      <div className="text-lg font-bold">{data.name}</div>
      <div className="font-semibold">{decimalToMoney(data.price)}</div>
      <div className="truncate mb-3">{data.ingredients}</div>
      <div className="text-center">
        <Button className="cursor-pointer" onClick={handleAddToCart}>Adicionar ao carrinho</Button>
      </div>
    </div>
  )
}