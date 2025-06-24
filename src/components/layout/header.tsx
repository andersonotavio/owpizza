"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { CartButton } from "../cart/button-cart";
import Image from "next/image";

export function Header() {
  return (
    <header className=" bg-secondary ">
      <div className="container mx-auto flex my-4 p-5 items-center justify-between  rounded-md">
        <Link href="/">
          <div className="text-2xl font-bold">
            <Image
              src={"/logo.png"}
              alt="Logo da Pizzaria"
              width={50}
              height={50}
              className="w-[50px] md:w-full"
            />
          </div>
        </Link>
        <div className="flex gap-2">
          <Button className="cursor-pointer">Login/Cadastro</Button>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
