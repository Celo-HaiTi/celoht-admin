import { afterEach, describe, expect, it, vi } from "vitest";
import { isMockMode } from "./data-source";

describe("data source production guard", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("rejects fixture mode in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ENABLE_DEV_FIXTURES", "true");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "anon-key");

    expect(() => isMockMode()).toThrow("Mock mode is forbidden in production");
  });

  it("rejects missing production configuration", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");

    expect(() => isMockMode()).toThrow("Production dashboard providers are not configured");
  });
});