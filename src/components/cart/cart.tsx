"use client"

import { useCart } from "@/store/cart"
import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer"
import { useEffect, useState } from "react";
import { CartEmpty } from "./button-empty";
import { ListCart } from "./list-cart";

export const Cart = () => {
  const cart = useCart();
  const [open, setOpen] = useState(cart.open);

  useEffect(()=> {
    setOpen(cart.open);
  }, [cart])

   return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={open => cart.setOpen(open)}
    >
      <DrawerContent className="p-4">
        <DrawerTitle>Carrinho</DrawerTitle>
        {cart.items.length <= 0 && <CartEmpty />}
        {cart.items.length > 0 && <ListCart />}
      </DrawerContent>
    </Drawer>
  )
}