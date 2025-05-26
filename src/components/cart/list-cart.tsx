import { useCart } from "@/store/cart"
import { Button } from "../ui/button"
import { useProducts } from "@/store/products";
import { useState } from "react";

export const ListCart = () => {
  const cart = useCart();
  const products = useProducts();

  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(10);
  return (
    <>
      <div>
        <p>---</p>
      </div>
      <div>
        <div>Sub-total:</div>
        <div>Frete:</div>
        <div>Total:</div>
      </div>
      <Button>Finalizar Compra</Button>
    </>
  )
}