export const MIN_PARTICIPANTS = 1;
export const MAX_PARTICIPANTS = 30;

export type PlanEstimate = {
  perPerson: number;
  total: number;
  /** Budget per person minus the estimated price per person; null when no budget given. */
  budgetGap: number | null;
  withinBudget: boolean | null;
};

export function clampParticipants(n: number): number {
  if (!Number.isFinite(n)) return MIN_PARTICIPANTS;
  return Math.min(MAX_PARTICIPANTS, Math.max(MIN_PARTICIPANTS, Math.round(n)));
}

export function estimatePlan(
  pricePerPerson: number,
  participants: number,
  budgetPerPerson?: number | null,
): PlanEstimate {
  const people = clampParticipants(participants);
  const total = pricePerPerson * people;
  const hasBudget =
    budgetPerPerson != null && Number.isFinite(budgetPerPerson) && budgetPerPerson > 0;
  const budgetGap = hasBudget ? (budgetPerPerson as number) - pricePerPerson : null;
  return {
    perPerson: pricePerPerson,
    total,
    budgetGap,
    withinBudget: budgetGap == null ? null : budgetGap >= 0,
  };
}

export function formatDZD(amount: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} DA`;
}
