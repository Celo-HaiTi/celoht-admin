"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
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
 * Unauthenticated mock access is handled by middleware in explicitly enabled
 * non-production environments. This page never creates a fake session.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const next = params.get("next") ?? "/dashboard/executive";
  const configurationRequired = params.get("reason") === "configuration";

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    if (!supabase) {
      toast.error("Admin authentication is not configured.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${next}`,
      },
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
    <div className="bg-navy-950 flex min-h-screen items-center justify-center px-4">
      <div className="border-navy-800 bg-navy-900 text-navy-50 w-full max-w-sm rounded-lg border p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-2">
          <div className="bg-gold-400 text-navy-950 flex h-9 w-9 items-center justify-center rounded-md">
            <BarGlyph className="h-4 w-6 opacity-100" />
          </div>
          <div>
            <p className="font-display text-base font-semibold">CeloHT Admin</p>
            <p className="text-navy-100/60 text-xs">Sign in to the control center</p>
          </div>
        </div>

        {sent ? (
          <p className="bg-navy-850 text-navy-100 rounded-md p-3 text-sm">
            Check <span className="font-medium">{email}</span> for a sign-in link.
          </p>
        ) : configurationRequired ? (
          <p className="bg-navy-850 text-navy-100 rounded-md p-3 text-sm">
            Supabase authentication is required before this admin environment can be used.
          </p>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-3">
            <label className="text-navy-100/70 block text-xs" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@celoht.com"
              className="border-navy-700 bg-navy-950 h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[--ring]"
            />
            <Button type="submit" variant="gold" className="w-full" disabled={loading}>
              <Mail className="h-4 w-4" />
              {loading ? "Sending…" : "Send magic link"}
            </Button>
          </form>
        )}

        <div className="text-navy-100/40 my-4 flex items-center gap-2 text-xs">
          <div className="bg-navy-800 h-px flex-1" />
          or
          <div className="bg-navy-800 h-px flex-1" />
        </div>

        <Button
          variant="outline"
          className="border-navy-700 text-navy-50 hover:bg-navy-850 w-full"
          onClick={handleWalletConnect}
        >
          <Wallet className="h-4 w-4" />
          Continue with Valora
        </Button>

        <p className="text-navy-100/40 mt-6 text-center text-[11px]">
          Access is limited to Foundation Director, Maintainer Council, and approved
          Community Contributors.
        </p>
      </div>
    </div>
  );
}
