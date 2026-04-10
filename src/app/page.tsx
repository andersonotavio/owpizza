import { Header } from "@/components/layout/header";
import { PizzaList } from "@/components/home/pizza-list";
import { getAllProducts } from "@/services/product";
import { getPizzaImage } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    const pizzas = await getAllProducts();

    const pizzasItems = pizzas.map((pizza) => ({
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
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    return (
      <div>
        <Header />
        <main className="container mx-auto mb-10">
          <p>Erro ao carregar pizzas. Tente novamente mais tarde.</p>
        </main>
      </div>
    );
  }
}
