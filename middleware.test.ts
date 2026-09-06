import { describe, expect, it } from "vitest";
import { isUnauthenticatedMockModeAllowed } from "./middleware";

describe("isUnauthenticatedMockModeAllowed", () => {
  it("allows explicit mock access during development", () => {
    expect(
      isUnauthenticatedMockModeAllowed({
        NODE_ENV: "development",
        NEXT_PUBLIC_ALLOW_UNAUTHENTICATED_MOCK_MODE: "true",
      }),
    ).toBe(true);
  });

  it("fails closed in production even when the flag is set", () => {
    expect(
      isUnauthenticatedMockModeAllowed({
        NODE_ENV: "production",
        NEXT_PUBLIC_ALLOW_UNAUTHENTICATED_MOCK_MODE: "true",
      }),
    ).toBe(false);
  });

  it("requires an explicit flag", () => {
    expect(isUnauthenticatedMockModeAllowed({ NODE_ENV: "development" })).toBe(false);
  });
});
