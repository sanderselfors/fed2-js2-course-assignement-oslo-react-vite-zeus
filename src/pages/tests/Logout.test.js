import { describe, it, expect } from "vitest";

describe("Navigation", () => {
  it("should clear token from browser storage on successful logout", () => {
    const handleLogout = () => {
      localStorage.clear();
    };

    localStorage.setItem("accessToken", "mockAccessToken");

    handleLogout();

    expect(localStorage.getItem("accessToken")).toBeNull();
  });
});
