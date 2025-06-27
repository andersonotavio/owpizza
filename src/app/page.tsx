import { Header } from "@/components/layout/header";
// import { api } from "@/lib/axios";
import { PizzaList } from "@/components/home/pizza-list";
// import { Product } from "@/generated/prisma";
import { getAllProducts } from "@/services/product";
import { decimalToMoney } from "@/lib/utils";

export default async function Page() {
  // const pizzasReq = await api.get<{ pizzas: Product[] }>('/pizzas');
  // const pizzas = pizzasReq.data.pizzas ?? [];

  let pizzas = await getAllProducts();

  // Aplique a mesma transformação das imagens
  let pizzasItems = pizzas.map((pizza) => ({
    ...pizza,
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/pizzas/${pizza.image}`,
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
