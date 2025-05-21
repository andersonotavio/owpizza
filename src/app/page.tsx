import { Header } from "@/components/layout/header";
import { api } from "@/lib/axios";
import { PizzaList } from "@/components/home/pizza-list";
import { Product } from "@/generated/prisma";



export default async function Page() {
  // const pizzasReq = await api.get<{ pizzas: Product[] }>('/pizzas');
  // const pizzas = pizzasReq.data.pizzas ?? [];

  return (
    <div>
      <Header />
      <main className="container mx-auto mb-10">
        <h1>Teste</h1>
        {/* <PizzaList pizzas={pizzas} /> */}
      </main>
    </div>
  );
}
