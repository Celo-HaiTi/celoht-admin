import { notFound } from "next/navigation";
import { ALL_SLUGS } from "@/lib/nav-config";
import ExecutiveDashboard from "@/page (4)";
import TransparencyDashboard from "@/page (17)";
import KpiDashboard from "@/page (20)";
import ImpactDashboard from "@/page (16)";
import TreasuryDashboard from "@/page (24)";
import DonationsDashboard from "@/page (21)";
import GrantsDashboard from "@/page (6)";
import RevenueDashboard from "@/page (2)";
import ExpensesDashboard from "@/page (19)";
import EducationDashboard from "@/page (7)";
import CommunityDashboard from "@/page (3)";
import VolunteersDashboard from "@/page (25)";
import AmbassadorsDashboard from "@/page (5)";
import PartnershipsDashboard from "@/page (15)";
import ReforestationDashboard from "@/page (18)";
import AgentNetworkDashboard from "@/page (22)";
import WalletAnalyticsDashboard from "@/page (13)";
import BlockchainAnalyticsDashboard from "@/page (12)";
import GithubAnalyticsDashboard from "@/page (10)";
import SecurityDashboard from "@/page (26)";
import GovernanceDashboard from "@/page (8)";
import RiskDashboard from "@/page (9)";
import AuditDashboard from "@/page (11)";
import ReportsDashboard from "@/page (23)";

const dashboardMap = {
  executive: ExecutiveDashboard,
  transparency: TransparencyDashboard,
  kpi: KpiDashboard,
  impact: ImpactDashboard,
  treasury: TreasuryDashboard,
  donations: DonationsDashboard,
  grants: GrantsDashboard,
  revenue: RevenueDashboard,
  expenses: ExpensesDashboard,
  education: EducationDashboard,
  community: CommunityDashboard,
  volunteers: VolunteersDashboard,
  ambassadors: AmbassadorsDashboard,
  partnerships: PartnershipsDashboard,
  reforestation: ReforestationDashboard,
  "agent-network": AgentNetworkDashboard,
  "wallet-analytics": WalletAnalyticsDashboard,
  "blockchain-analytics": BlockchainAnalyticsDashboard,
  "github-analytics": GithubAnalyticsDashboard,
  security: SecurityDashboard,
  governance: GovernanceDashboard,
  risk: RiskDashboard,
  audit: AuditDashboard,
  reports: ReportsDashboard,
} as const;

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export default async function DashboardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const Component = dashboardMap[slug as keyof typeof dashboardMap];

  if (!Component) {
    notFound();
  }

  return <Component />;
}
