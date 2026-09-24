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

  test("doesn't allow clicking the nav links if not logged in", async ({ page }) => {
    const form = new HomePage(page)
    await form.goto()
    await form.clickMap()
    await form.expectFailure()
    await form.clickList()
    await form.expectFailure()
    await form.clickAccount()
    await form.expectFailure()
  })

  test("Takes to the map if click on the map nav and signed in", async ({ page }) => {
    const signup = new SignupPage(page)
    await signup.goto()
    await signup.fillRequiredFields({
      username: "user1",
      password: "user1",
      cpass: "user1"
    })
    await signup.submit()

    await page.waitForURL("**/login")

    const login = new LoginPage(page)

    await login.fillRequiredFields({
      username: "user1",
      password: "user1"
    })

    await login.submit()

    const form = new HomePage(page)
    await form.goto()
    await form.clickMap()
    await form.expectMap()
  })

  test("Takes to the list page if click on the list nav and signed in", async ({ page }) => {
    const signup = new SignupPage(page)
    await signup.goto()
    await signup.fillRequiredFields({
      username: "user1",
      password: "user1",
      cpass: "user1"
    })
    await signup.submit()

    await page.waitForURL("**/login")

    const login = new LoginPage(page)

    await login.fillRequiredFields({
      username: "user1",
      password: "user1"
    })

    await login.submit()

    const form = new HomePage(page)
    await form.goto()
    await form.clickList()
    await form.expectList()
  })

  test("Takes to the account page if click on the account nav and signed in", async ({ page }) => {
    const signup = new SignupPage(page)
    await signup.goto()
    await signup.fillRequiredFields({
      username: "user1",
      password: "user1",
      cpass: "user1"
    })
    await signup.submit()

    await page.waitForURL("**/login")

    const login = new LoginPage(page)

    await login.fillRequiredFields({
      username: "user1",
      password: "user1"
    })

    await login.submit()

    const form = new HomePage(page)
    await form.goto()
    await form.clickAccount()
    await form.expectAccount()
  })

})
