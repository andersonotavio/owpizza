import { Header } from "@/components/layout/header";
// import { api } from "@/lib/axios";
import { PizzaList } from "@/components/home/pizza-list";
// import { Product } from "@/generated/prisma";
import { getAllProducts } from "@/services/product";
import { decimalToMoney, getPizzaImage } from "@/lib/utils";

export default async function Page() {
  let pizzas = await getAllProducts();

  let pizzasItems = pizzas.map((pizza) => ({
    ...pizza,
    price: Number(pizza.price),
    image: getPizzaImage(pizza.name),
  }));

  return (
    <div>
      <Header />
      <main className="container mx-auto mb-10">
        <PizzaList pizzas={pizzasItems} />
      </main>
    </div>
  );
}
