const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

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
  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
    });
    test("a new blog can be created", async ({ page }) => {
      await page.getByText("new blog").click();
      const textboxes = await page.getByRole("textbox").all();
      await textboxes[0].fill("New title");
      await textboxes[1].fill("New author");
      await textboxes[2].fill("New URL");
      await page.getByText("create").click();

      await expect(page.getByText("New title New author")).toBeVisible();
    });

    test("like the blog post", async ({ page }) => {
      await createBlog(page);
      await page.getByText("view").click();
      await page.getByText("like").click();

      await expect(page.getByText("likes 1 like")).toBeVisible();
    });

    test("deleting blog post works", async ({ page }) => {
      await createBlog(page);
      await page.getByText("view").click();
      page.on("dialog", (dialog) => dialog.accept());
      await page.getByText("remove").click();

      await expect(page.getByText("New title New Author")).toBeHidden();
    });
  });
});
