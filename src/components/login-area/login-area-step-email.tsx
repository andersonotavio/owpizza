"use client";

import { useState } from "react";
import { CustomInput } from "../layout/custom-input";
import { Button } from "../ui/button";
import z, { treeifyError } from "zod";
import { api } from "@/lib/axios";

const schema = z.object({
  email: z.email("E-mail inválido"),
});
type Props = {
  validateEmail: (hasEmail: boolean, email: string) => void;
};

export const LoginAreaStepEmail = ({ validateEmail }: Props) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);
  const [emailField, setEmailField] = useState("");

  const handleButton = async () => {
    setErrors(null);
    const validateData = schema.safeParse({
      email: emailField,
    });
    if (!validateData.success) {
      const treeifieldErros = treeifyError(validateData.error);
      const emailErrors = treeifieldErros.properties;
      setErrors(emailErrors);
      return false;
    }
    try {
      setLoading(true);
      const emailReq = await api.post("/auth/check", {
        email: validateData.data.email,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);

      const data = emailReq.data as { exists: boolean };

      validateEmail(data.exists ? true : false, validateData.data.email);
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
          type="email"
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
        />
      </div>
      <Button disabled={loading} onClick={handleButton}>
        Continuar
      </Button>
    </>
  );
};
