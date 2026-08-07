/**
 * Minimal typed schema matching supabase/migrations/0001_init.sql.
 * Regenerate with `supabase gen types typescript` once the project
 * is live to keep this in sync — see /docs/DATABASE.md.
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: "director" | "council" | "contributor" | "viewer";
          avatar_url: string | null;
          region: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & {
          id: string;
          email: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      treasury_transactions: {
        Row: {
          id: string;
          type: "inflow" | "outflow";
          category: string;
          amount_usd: number;
          currency: "USD" | "cUSD" | "CELO";
          description: string;
          tx_hash: string | null;
          occurred_at: string;
          created_by: string;
        };
        Insert: Partial<Database["public"]["Tables"]["treasury_transactions"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["treasury_transactions"]["Row"]>;
      };
      audit_log: {
        Row: {
          id: string;
          actor_id: string;
          action: string;
          target: string;
          metadata: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["audit_log"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["audit_log"]["Row"]>;
      };
    };
  };
}
