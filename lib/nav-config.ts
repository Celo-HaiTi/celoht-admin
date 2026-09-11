import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, Wallet, HandCoins, Gift, TrendingUp, Receipt, GraduationCap,
  Users, HeartHandshake, Award, Handshake, TreePine, Network, WalletCards,
  Blocks, Github, ShieldCheck, Landmark, Eye, Target, Sparkles, TriangleAlert,
  ClipboardCheck, FileBarChart,
} from "lucide-react";

export interface NavItem {
  slug: string;
  label: string;
  icon: LucideIcon;
  /** true once the dashboard has a full build; false renders the
   *  "coming in a future build pass" shell so the route never 404s. */
  built: boolean;
}

export interface NavGroup {
  group: string;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  {
    group: "Overview",
    items: [
      { slug: "executive", label: "Executive", icon: LayoutDashboard, built: true },
      { slug: "transparency", label: "Transparency", icon: Eye, built: true },
      { slug: "kpi", label: "KPI", icon: Target, built: true },
      { slug: "impact", label: "Impact", icon: Sparkles, built: true },
    ],
  },
  {
    group: "Finance",
    items: [
      { slug: "treasury", label: "Treasury", icon: Wallet, built: true },
      { slug: "donations", label: "Donations", icon: HandCoins, built: true },
      { slug: "grants", label: "Grants", icon: Gift, built: true },
      { slug: "revenue", label: "Revenue", icon: TrendingUp, built: true },
      { slug: "expenses", label: "Expenses", icon: Receipt, built: true },
    ],
  },
  {
    group: "Programs",
    items: [
      { slug: "education", label: "Education", icon: GraduationCap, built: true },
      { slug: "community", label: "Community", icon: Users, built: true },
      { slug: "volunteers", label: "Volunteers", icon: HeartHandshake, built: true },
      { slug: "ambassadors", label: "Ambassadors", icon: Award, built: true },
      { slug: "partnerships", label: "Partnerships", icon: Handshake, built: true },
      { slug: "reforestation", label: "Reforestation", icon: TreePine, built: true },
      { slug: "agent-network", label: "Agent Network", icon: Network, built: true },
    ],
  },
  {
    group: "Technology",
    items: [
      { slug: "wallet-analytics", label: "Wallet Analytics", icon: WalletCards, built: true },
      { slug: "blockchain-analytics", label: "Blockchain Analytics", icon: Blocks, built: true },
      { slug: "github-analytics", label: "GitHub Analytics", icon: Github, built: true },
      { slug: "security", label: "Security", icon: ShieldCheck, built: true },
    ],
  },
  {
    group: "Governance",
    items: [
      { slug: "governance", label: "Governance", icon: Landmark, built: true },
      { slug: "risk", label: "Risk", icon: TriangleAlert, built: true },
      { slug: "audit", label: "Audit", icon: ClipboardCheck, built: true },
      { slug: "reports", label: "Reports", icon: FileBarChart, built: true },
    ],
  },
];

export const ALL_SLUGS = NAV.flatMap((g) => g.items.map((i) => i.slug));
