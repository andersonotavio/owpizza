"use client";

import { useAuth } from "@/store/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { LoginAreaStepEmail } from "./login-area-step-email";
import { LoginAreaSignUp } from "./login-area-step-signup";
import { getCookie } from "cookies-next/client";
import { LoginAreaSignIn } from "./login-area-step-signin";

type Steps = "EMAIL" | "SIGNIN" | "SIGNUP";

export const LoginAreaDialog = () => {
  const auth = useAuth();
  const [step, setSteps] = useState<Steps>("EMAIL");
  const [emailField, setEmailField] = useState("");

  useEffect(() => {
    const token = getCookie("token");
    if (token) auth.setToken(token);
  }, []);

  function handleValidateEmail(hasEmail: boolean, email: string) {
    setEmailField(email);
    if (hasEmail) {
      setSteps("SIGNIN");
    } else {
      setSteps("SIGNUP");
    }
  }

  return (
    <Dialog open={auth.open} onOpenChange={(open) => auth.setOpen(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step !== "EMAIL" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSteps("EMAIL")}
              >
                <ArrowLeft className="size-4" />
              </Button>
            )}

            {step === "EMAIL" && "Login / Cadastro"}
            {step === "SIGNIN" && "Login"}
            {step === "SIGNUP" && "Cadastro"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {step === "EMAIL" && (
            <LoginAreaStepEmail validateEmail={handleValidateEmail} />
          )}
          {step === "SIGNIN" && <LoginAreaSignIn email={emailField} />}
          {step === "SIGNUP" && <LoginAreaSignUp email={emailField} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
