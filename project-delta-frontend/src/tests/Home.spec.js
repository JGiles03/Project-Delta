// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from "../Pages/HomePage/HomePageModel";
import { SignupPage } from "../Pages/SignupPage/SignupPageModel"
import { LoginPage } from "../Pages/LoginPage/LoginPageModel"
import { describe } from "node:test";

describe("Home page tests", () => {
  test('Goes to login page', async ({ page }) => {
    const form = new HomePage(page)
    await form.goto()
    await form.login()
    await form.expectLogin()
  });

  test("goes to sign up page", async ({ page }) => {
    const form = new HomePage(page)
    await form.goto()
    await form.signup()
    await form.expectSignup()
  });

  test("allows to continue as guest", async ({ page }) => {
    const form = new HomePage(page)
    await form.goto()
    await form.guest()
    await form.expectMap()
  });

})
