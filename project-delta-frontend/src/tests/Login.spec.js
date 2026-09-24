// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from "../Pages/LoginPage/LoginPageModel";
import { SignupPage } from '../Pages/SignupPage/SignupPageModel';
import { describe } from "node:test";

describe("Login page tests", () => {
  test('logs in with correct user and password', async ({ page }) => {
    const signup = new SignupPage(page)
    await signup.goto()
    await signup.fillRequiredFields({
      username: "user1",
      password: "user1",
      cpass: "user1"
    })
    await signup.submit()

    await page.waitForURL("**/login")

    const form = new LoginPage(page)
    //await form.goto()

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
