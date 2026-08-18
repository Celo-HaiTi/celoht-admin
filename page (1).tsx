"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Wallet, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { BarGlyph } from "@/components/dashboard/bar-glyph";
import { toast } from "sonner";

/**
 * Two sign-in paths, matching how CeloHT actually operates:
 *  - Email magic link, for Foundation Director / Maintainer Council members
 *    who manage the platform day to day via Supabase Auth.
 *  - Wallet connect (Valora), for verifying on-chain roles without a
 *    separate password to manage - consistent with CeloHT's Celo-native,
 *    Valora-only wallet policy.
 * In mock mode (no Supabase configured) both buttons drop straight into
 * the dashboard as a demo viewer so the UI stays reviewable.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/dashboard/executive";

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    if (!supabase) {
      toast.info("Mock mode: Supabase isn't configured, so this signs you in as a demo viewer.");
      router.push(next);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${next}` },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
  }

  function handleWalletConnect() {
    toast.info(
      "Wallet-based sign-in via Valora is wired to the RBAC layer but requires WalletConnect project credentials - see docs/AUTHENTICATION.md.",
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-sm rounded-lg border border-navy-800 bg-navy-900 p-8 text-navy-50 shadow-xl">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gold-400 text-navy-950">
            <BarGlyph className="h-4 w-6 opacity-100" />
          </div>
          <div>
            <p className="font-display text-base font-semibold">CeloHT Admin</p>
            <p className="text-xs text-navy-100/60">Sign in to the control center</p>
          </div>
        </div>

        {sent ? (
          <p className="rounded-md bg-navy-850 p-3 text-sm text-navy-100">
            Check <span className="font-medium">{email}</span> for a sign-in link.
          </p>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-3">
            <label className="block text-xs text-navy-100/70" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@celoht.com"
              className="h-9 w-full rounded-md border border-navy-700 bg-navy-950 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[--ring]"
            />
            <Button type="submit" variant="gold" className="w-full" disabled={loading}>
              <Mail className="h-4 w-4" />
              {loading ? "Sending…" : "Send magic link"}
            </Button>
          </form>
        )}

        <div className="my-4 flex items-center gap-2 text-xs text-navy-100/40">
          <div className="h-px flex-1 bg-navy-800" />
          or
          <div className="h-px flex-1 bg-navy-800" />
        </div>

        <Button variant="outline" className="w-full border-navy-700 text-navy-50 hover:bg-navy-850" onClick={handleWalletConnect}>
          <Wallet className="h-4 w-4" />
          Continue with Valora
        </Button>

        <p className="mt-6 text-center text-[11px] text-navy-100/40">
          Access is limited to Foundation Director, Maintainer Council, and
          approved Community Contributors.
        </p>
      </div>
    </div>
  );
}
