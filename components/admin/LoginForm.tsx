"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/Button";
import { loginAdmin, type LoginState } from "@/lib/actions/admin-auth";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, {} as LoginState);

  return (
    <form action={formAction} className="max-w-sm space-y-6">
      {state.error ? (
        <p className="text-sm text-ink" role="alert">
          {state.error}
        </p>
      ) : null}
      <div>
        <label htmlFor="password" className="admin-label">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="admin-input mt-2"
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Connexion…" : "Se connecter"}
      </Button>
    </form>
  );
}
