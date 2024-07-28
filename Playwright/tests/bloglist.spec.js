const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith } = require("./helper");

describe("Blog list app E2E tests", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:5173/api/testing/reset");
    await request.post("http://localhost:5173/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const loginButton = await page.getByText("login");
    await expect(loginButton).toBeVisible();
  });

  describe("Login", () => {
    test("Succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");

      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "mlukai", "salainen");

      await expect(page.getByText("Wrong credentials")).toBeVisible();
    });
  });
});
