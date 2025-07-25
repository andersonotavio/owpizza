import { useCart } from "@/store/cart";
import { Button } from "../ui/button";
import { useProducts } from "@/store/products";
import { useEffect, useState } from "react";
import { CartProducts } from "./cart-products";
import { decimalToMoney } from "@/lib/utils";
import { useAuth } from "@/store/auth";

export const ListCart = () => {
  const auth = useAuth();
  const cart = useCart();
  const products = useProducts();

  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(10);

  const calculateSubTotal = () => {
    let sub = 0;
    for (let item of cart.items) {
      const prod = products.products.find(
        (pitem) => pitem.id === item.productId
      );
      if (prod) {
        sub += item.quantity * parseFloat(prod.price.toString());
      }
      setSubTotal(sub);
    }
  };

  useEffect(calculateSubTotal, [cart]);

  return (
    <>
      <div className="flex flex-col gap-3 my-5">
        <div>
          {cart.items.map((item) => (
            <CartProducts key={item.productId} data={item} />
          ))}
        </div>
      </div>
      <div className="my-4 text-right">
        <div>Sub-total: {decimalToMoney(subTotal)}</div>
        <div>Frete: {decimalToMoney(shipping)}</div>
        <div className="bold">Total: {decimalToMoney(subTotal + shipping)}</div>
      </div>
      {auth.token && (
        <Button className="bg-green-600 hover:bg-green-700">
          Finalizar Compra
        </Button>
      )}
      {!auth.token && (
        <Button onClick={() => auth.setOpen(true)}>Login / Cadastro</Button>
      )}
    </>
  );
};
