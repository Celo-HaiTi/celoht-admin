import { describe, expect, it } from "vitest";

describe("middleware security contract", () => {
  it("does not expose an unauthenticated mock-mode bypass", async () => {
    const middlewareSource = await import("node:fs").then((fs) =>
      fs.readFileSync("middleware.ts", "utf8"),
    );

    expect(middlewareSource).not.toContain("isUnauthenticatedMockModeAllowed");
    expect(middlewareSource).not.toContain("NEXT_PUBLIC_ALLOW_UNAUTHENTICATED_MOCK_MODE");
  });
});
