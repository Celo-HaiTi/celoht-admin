import { describe, expect, it } from "vitest";
import { safeNextPath } from "@/lib/auth/redirect";

describe("safeNextPath", () => {
  it("allows an internal dashboard path", () => {
    expect(safeNextPath("/dashboard/treasury")).toBe("/dashboard/treasury");
  });

  it("rejects missing and external redirect targets", () => {
    expect(safeNextPath(null)).toBe("/dashboard/executive");
    expect(safeNextPath("https://attacker.example")).toBe("/dashboard/executive");
    expect(safeNextPath("//attacker.example")).toBe("/dashboard/executive");
  });
});