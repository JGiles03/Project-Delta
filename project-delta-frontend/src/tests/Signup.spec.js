// @ts-check
import { test, expect } from '@playwright/test';
import { SignupPage } from "../Pages/SignupPage/SignupPageModel";
import { describe } from "node:test";

describe("Signup page tests", () => {
  test('signs up with new user and matching passwords', async ({ page }) => {
    const form = new SignupPage(page)
    await form.goto()

    await form.fillRequiredFields({
      username: "user1",
      password: "user1",
      cpass: "user1"
    })

    await form.submit()
    await form.expectSuccess()
  });

//   test("doesn't sign up with duplicate username", async ({ page }) => {
//     const form = new SignupPage(page)
//     await form.goto()

//     await form.fillRequiredFields({
//       username: "incorrect_user",
//       password: "user1"
//     })
//
//     await form.submit()
//     await form.expectFailure()
//   });

  test("doesn't sign up with 2 different passwords", async ({ page }) => {
    const form = new SignupPage(page)
    await form.goto()

    await form.fillRequiredFields({
      username: "user1",
      password: "user1",
      cpass: "bawbafou"
    })

    await form.submit()
    await form.expectFailure()
  });

  test("doesn't sign up with no inputs", async ({ page }) => {
    const form = new SignupPage(page)
    await form.goto()

    await form.submit()
    await form.expectFailure()
  });

})
