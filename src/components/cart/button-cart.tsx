"use client";

import { useCart } from "@/store/cart";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

export const CartButton = () => {
  const cart = useCart();

  return (
    <Button
      size="icon"
      className="cursor-pointer"
      onClick={() => cart.setOpen(true)}
    >
      <ShoppingCart />
    </Button>
  );
};
