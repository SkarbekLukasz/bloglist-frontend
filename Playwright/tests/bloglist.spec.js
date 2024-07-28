const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog list app E2E tests", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const loginButton = await page.getByText("login");
    await expect(loginButton).toBeVisible();
  });
});
