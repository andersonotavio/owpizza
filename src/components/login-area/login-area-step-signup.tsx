"use client";

import { useAuth } from "@/store/auth";
import { useState } from "react";
import z, { treeifyError } from "zod";
import { CustomInput } from "../layout/custom-input";
import { Button } from "../ui/button";
import { api } from "@/lib/axios";

const schema = z
  .object({
    name: z.string().min(2, "Campo obrigatório"),
    email: z.email("Email invalido"),
    password: z.string().min(4, "Campo obrigatótio"),
    confirmPassword: z.string().min(4, "Campo obrigatótio"),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    message: "Senha não são iguais",
    path: ["confirmPassword"],
  });

type Props = {
  email: string;
};

export const LoginAreaSignUp = ({ email }: Props) => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErros] = useState<any>(null);

  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState(email);
  const [passwordField, setPasswordField] = useState("");
  const [confirmPasswordField, setConfirmPasswordField] = useState("");

  const handleButton = async () => {
    setErros(null);
    const validateData = schema.safeParse({
      name: nameField,
      email: emailField,
      password: passwordField,
      confirmPassword: confirmPasswordField,
    });
    if (!validateData.success) {
      const treeifieldErros = treeifyError(validateData.error);
      const fieldErros = treeifieldErros.properties;
      setErros(fieldErros);
      return false;
    }
    try {
      setLoading(true);
      const signupReq = await api.post("/auth/signup", {
        name: validateData.data.name,
        email: validateData.data.email,
        password: validateData.data.password,
        confirmPassword: validateData.data.confirmPassword,
      });
      const data = signupReq.data as { token?: string; error?: string };
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
        <p className="mb-2">Digite seu nome</p>
        <CustomInput
          name="name"
          errors={errors}
          disabled={loading}
          type="text"
          value={nameField}
          onChange={(e) => setNameField(e.target.value)}
          autoFocus
        />
      </div>

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
        />
      </div>

      <div>
        <p className="mb-2">Repita sua senha</p>
        <CustomInput
          name="confirmPassword"
          errors={errors}
          disabled={loading}
          type="password"
          value={confirmPasswordField}
          onChange={(e) => setConfirmPasswordField(e.target.value)}
        />
      </div>

      <Button disabled={loading} onClick={handleButton}>
        Continuar
      </Button>
    </>
  );
};
