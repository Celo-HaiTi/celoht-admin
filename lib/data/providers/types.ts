import type { ProviderResult } from "@/lib/data/provenance";

export interface TreasuryBalance {
  address: string;
  currency: string;
  amount: string;
  amountUsd: string | null;
}

export interface TreasuryTransaction {
  id: string;
  chain: string;
  address: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
  token: string;
  amount: string;
  status: "VERIFIED" | "PENDING" | "FAILED" | "UNAVAILABLE";
  verificationStatus: "VERIFIED" | "UNVERIFIED";
}

export interface Donation {
  donationId: string;
  source: string;
  chain: string | null;
  transactionHash: string | null;
  blockNumber: number | null;
  amount: string;
  currency: string;
  timestamp: string;
  verificationStatus: "VERIFIED" | "UNVERIFIED";
}

export interface GovernanceProposal {
  proposalId: string;
  proposer: string;
  createdAt: string;
  votingPeriod: string | null;
  votes: { for: number; against: number } | null;
  quorum: number | null;
  result: string | null;
  executionStatus: string | null;
  transactionHash: string | null;
  stateType: "OFF_CHAIN_PROPOSAL" | "ON_CHAIN_GOVERNANCE_STATE";
}

export interface AgentRecord {
  id: string;
  status: "APPLIED" | "KYC_PENDING" | "VERIFIED" | "ACTIVE" | "SUSPENDED" | "REVOKED";
  verifiedAt: string | null;
}

export interface EducationRecord {
  id: string;
  status: "DATABASE_REPORTED" | "VERIFIED_EVIDENCE";
  updatedAt: string;
}

export interface ReforestationRecord {
  id: string;
  state: "DONATED" | "ALLOCATED" | "REPORTED" | "VERIFIED";
  evidenceId: string | null;
  updatedAt: string;
}

export interface AuditRecord {
  id: string;
  actorId: string;
  actorRole: string;
  action: string;
  resourceType: string;
  resourceId: string | null;
  timestamp: string;
  result: "SUCCESS" | "FAILURE";
  failureReason: string | null;
  requestId: string;
  metadata: Record<string, unknown> | null;
  transactionHash: string | null;
}

export interface TreasuryProvider {
  getBalance(): Promise<ProviderResult<TreasuryBalance>>;
  getTransactions(): Promise<ProviderResult<TreasuryTransaction[]>>;
}

export interface DonationsProvider {
  getDonations(): Promise<ProviderResult<Donation[]>>;
}

export interface GovernanceProvider {
  getProposals(): Promise<ProviderResult<GovernanceProposal[]>>;
}

export interface AgentsProvider {
  getAgents(): Promise<ProviderResult<AgentRecord[]>>;
}

export interface EducationProvider {
  getRecords(): Promise<ProviderResult<EducationRecord[]>>;
}

export interface ReforestationProvider {
  getRecords(): Promise<ProviderResult<ReforestationRecord[]>>;
}

export interface AuditProvider {
  getRecords(): Promise<ProviderResult<AuditRecord[]>>;
}