"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuth } from "@/store/auth";

type Props = {
  initialState: boolean;
};

export const LoginAreaButton = ({ initialState }: Props) => {
  const auth = useAuth();
  const [authState, setAuthState] = useState<boolean>(initialState);

  useEffect(() => {
    setAuthState(auth.token ? true : false);
  }, [auth]);

  function handleLogout() {
    auth.setToken(null);
  }

  if (authState) {
    return (
      <>
        <Link href="/pedidos">
          <Button>Meus Pedidos</Button>
        </Link>
        <Button onClick={handleLogout}>Sair</Button>
      </>
    );
  } else {
    return (
      <Button className="cursor-pointer" onClick={() => auth.setOpen(true)}>
        Login /Cadastro
      </Button>
    );
  }
};
