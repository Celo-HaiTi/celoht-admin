import { unavailable, type ProviderResult } from "@/lib/data/provenance";
import { getIndexedTreasuryTransactions, getVerifiedTreasuryBalance } from "@/lib/data/providers/celo";
import type {
  AgentRecord,
  AgentsProvider,
  AuditProvider,
  AuditRecord,
  Donation,
  DonationsProvider,
  EducationProvider,
  EducationRecord,
  GovernanceProposal,
  GovernanceProvider,
  ReforestationProvider,
  ReforestationRecord,
  TreasuryProvider,
} from "@/lib/data/providers/types";

const NOT_CONFIGURED = "Canonical production data provider is not configured";

function unavailableResult<T>(): Promise<ProviderResult<T>> {
  return Promise.resolve(unavailable<T>("CeloHT canonical provider", NOT_CONFIGURED));
}

export const realTreasuryProvider: TreasuryProvider = {
  getBalance: getVerifiedTreasuryBalance,
  getTransactions: getIndexedTreasuryTransactions,
};

export const realDonationsProvider: DonationsProvider = {
  getDonations: () => unavailableResult<Donation[]>(),
};

export const realGovernanceProvider: GovernanceProvider = {
  getProposals: () => unavailableResult<GovernanceProposal[]>(),
};

export const realAgentsProvider: AgentsProvider = {
  getAgents: () => unavailableResult<AgentRecord[]>(),
};

export const realEducationProvider: EducationProvider = {
  getRecords: () => unavailableResult<EducationRecord[]>(),
};

export const realReforestationProvider: ReforestationProvider = {
  getRecords: () => unavailableResult<ReforestationRecord[]>(),
};

export const realAuditProvider: AuditProvider = {
  getRecords: () => unavailableResult<AuditRecord[]>(),
};