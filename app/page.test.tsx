import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

const { redirectMock } = vi.hoisted(() => ({
  redirectMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

import HomePage from "./page";

describe("HomePage", () => {
  beforeEach(() => {
    redirectMock.mockClear();
  });

  it("redirects to the executive dashboard", () => {
    render(<HomePage />);
    expect(redirectMock).toHaveBeenCalledWith("/dashboard/executive");
  });
});
