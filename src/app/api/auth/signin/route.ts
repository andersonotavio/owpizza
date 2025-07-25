import { createUserToken, validateAuth } from "@/services/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log("Dados recebidos:", { email, password });
  if (!email || !password) {
    return NextResponse.json({ error: "Campos imcompletos" });
  }
  const user = await validateAuth(email, password);
  // console.log(
  //   "Resultado validateAuth:",
  //   user ? "Usuário encontrado" : "Usuário não encontrado"
  // );

  if (!user) return NextResponse.json({ error: "Acesso negado" });

  const token = await createUserToken(user.id);

  return NextResponse.json({ user, token });
}
