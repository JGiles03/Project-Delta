// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require("../Pages/LoginPage/LoginPageModel")
import { describe } from "node:test";

describe("Login page tests", () => {
  test('logs in with correct user and password', async ({ page }) => {
    const form = new LoginPage(page)
    await form.goto()

    await form.fillRequiredFields({
      username: "user1",
      password: "user1"
    })

    await form.submit()
    await form.expectSuccess()
  });

  test("doesn't log in with incorrect username", async ({ page }) => {
    const form = new LoginPage(page)
    await form.goto()

    await form.fillRequiredFields({
      username: "incorrect_user",
      password: "user1"
    })

    await form.submit()
    await form.expectFailure()
  });

  test("doesn't log in with incorrect password", async ({ page }) => {
    const form = new LoginPage(page)
    await form.goto()

    await form.fillRequiredFields({
      username: "user1",
      password: "incorrect_password"
    })

    await form.submit()
    await form.expectFailure()
  });

  test("doesn't log in with no inputs", async ({ page }) => {
    const form = new LoginPage(page)
    await form.goto()

    await form.submit()
    await form.expectFailure()
  });

})
