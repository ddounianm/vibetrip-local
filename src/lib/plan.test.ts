import { describe, expect, it } from "vitest";

import { clampParticipants, estimatePlan } from "./plan";

describe("estimatePlan", () => {
  it("multiplies the price per person by the number of participants", () => {
    expect(estimatePlan(1500, 4).total).toBe(6000);
  });

  it("flags a plan within budget and reports the remaining amount", () => {
    const e = estimatePlan(2500, 3, 3000);
    expect(e.withinBudget).toBe(true);
    expect(e.budgetGap).toBe(500);
  });

  it("flags a plan over budget", () => {
    const e = estimatePlan(4500, 2, 4000);
    expect(e.withinBudget).toBe(false);
    expect(e.budgetGap).toBe(-500);
  });

  it("ignores an empty budget", () => {
    expect(estimatePlan(800, 2, null).withinBudget).toBeNull();
  });
});

describe("clampParticipants", () => {
  it("keeps between 1 and 30 participants", () => {
    expect(clampParticipants(0)).toBe(1);
    expect(clampParticipants(45)).toBe(30);
  });
});
