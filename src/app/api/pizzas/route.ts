import { getAllProducts } from "@/services/product";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pizzas = await getAllProducts();
    return NextResponse.json({ pizzas });
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    return NextResponse.json({ pizzas: [], error: 'Failed to fetch pizzas' }, { status: 500 });
  }
}