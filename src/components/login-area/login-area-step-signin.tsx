"use client";

import { useAuth } from "@/store/auth";
import { useState } from "react";
import z, { treeifyError } from "zod";
import { CustomInput } from "../layout/custom-input";
import { Button } from "../ui/button";
import { api } from "@/lib/axios";

const schema = z.object({
  email: z.email("Email invalido"),
  password: z.string().min(2, "Campo obrigatótio"),
});

type Props = {
  email: string;
};

export const LoginAreaSignIn = ({ email }: Props) => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErros] = useState<any>(null);

  const [emailField, setEmailField] = useState(email);
  const [passwordField, setPasswordField] = useState("");

  const handleButton = async () => {
    setErros(null);
    const validateData = schema.safeParse({
      email: emailField,
      password: passwordField,
    });
    if (!validateData.success) {
      const treeifieldErros = treeifyError(validateData.error);
      const fieldErros = treeifieldErros.properties;
      setErros(fieldErros);
      return false;
    }
    try {
      setLoading(true);
      const signinReq = await api.post("/auth/signin", {
        email: validateData.data.email,
        password: validateData.data.password,
      });
      setLoading(false);
      const data = signinReq.data as { token?: string; error?: string };
      if (!data.token) {
        alert(data.error);
      } else {
        auth.setToken(data.token);
        auth.setOpen(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <p className="mb-2">Digite seu e-mail</p>
        <CustomInput
          name="email"
          errors={errors}
          disabled={loading}
          type="text"
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
        />
      </div>

      <div>
        <p className="mb-2">Digite sua senha</p>
        <CustomInput
          name="password"
          errors={errors}
          disabled={loading}
          type="password"
          value={passwordField}
          onChange={(e) => setPasswordField(e.target.value)}
          autoFocus
        />
      </div>

      <Button disabled={loading} onClick={handleButton}>
        Continuar
      </Button>
    </>
  );
};
