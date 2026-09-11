import ExecutiveDashboard from "./dashboards/dashboard-4";
import TransparencyDashboard from "./dashboards/dashboard-17";
import KpiDashboard from "./dashboards/dashboard-20";
import ImpactDashboard from "./dashboards/dashboard-16";
import TreasuryDashboard from "./dashboards/dashboard-24";
import DonationsDashboard from "./dashboards/dashboard-21";
import GrantsDashboard from "./dashboards/dashboard-6";
import RevenueDashboard from "./dashboards/dashboard-2";
import ExpensesDashboard from "./dashboards/dashboard-19";
import EducationDashboard from "./dashboards/dashboard-7";
import CommunityDashboard from "./dashboards/dashboard-3";
import VolunteersDashboard from "./dashboards/dashboard-25";
import AmbassadorsDashboard from "./dashboards/dashboard-5";
import PartnershipsDashboard from "./dashboards/dashboard-15";
import ReforestationDashboard from "./dashboards/dashboard-18";
import AgentNetworkDashboard from "./dashboards/dashboard-22";
import WalletAnalyticsDashboard from "./dashboards/dashboard-13";
import BlockchainAnalyticsDashboard from "./dashboards/dashboard-12";
import GithubAnalyticsDashboard from "./dashboards/dashboard-10";
import SecurityDashboard from "./dashboards/dashboard-26";
import GovernanceDashboard from "./dashboards/dashboard-8";
import RiskDashboard from "./dashboards/dashboard-9";
import AuditDashboard from "./dashboards/dashboard-11";
import ReportsDashboard from "./dashboards/dashboard-23";

export const developmentDashboardMap = {
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