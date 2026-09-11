import { Suspense } from "react";
import LoginPage from "./login-form";

export default function LoginRoute() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading…</div>}>
      <LoginPage />
    </Suspense>
  );
}
