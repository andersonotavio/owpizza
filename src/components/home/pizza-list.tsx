"use client";

import { Product } from "@/generated/prisma";
import { PizzaItem } from "./pizza-item";
import { useProducts } from "@/store/products";
import { useEffect } from "react";

type PizzaProduct = Omit<Product, "price"> & { price: number };

type Props = {
  pizzas: PizzaProduct[];
};

export const PizzaList = ({ pizzas }: Props) => {
  const products = useProducts();
  useEffect(() => products.setProducts(pizzas as unknown as Product[]), []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {pizzas.map((item: PizzaProduct) => (
        <PizzaItem key={item.id} data={item as unknown as Product} />
      ))}
    </div>
  );
};
