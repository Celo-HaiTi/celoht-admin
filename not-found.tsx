import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[--background] px-4 text-center">
      <p className="font-display text-4xl font-semibold">404</p>
      <p className="text-sm text-[--muted]">This page doesn't exist in the CeloHT Admin platform.</p>
      <Link href="/dashboard/executive">
        <Button variant="gold">Back to dashboard</Button>
      </Link>
    </div>
  );
}
