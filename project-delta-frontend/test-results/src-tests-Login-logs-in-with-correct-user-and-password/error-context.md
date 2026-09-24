# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: src\tests\Login.spec.js >> logs in with correct user and password
- Location: src\tests\Login.spec.js:8:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "https://project-delta-m6ba.onrender.com/"
Received: "https://project-delta-m6ba.onrender.com/home"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    8 × locator resolved to <html lang="en">…</html>
      - unexpected value "https://project-delta-m6ba.onrender.com/login"
    6 × locator resolved to <html lang="en">…</html>
      - unexpected value "https://project-delta-m6ba.onrender.com/home"

```

```yaml
- heading "Welcome to Child & Me" [level=1]
- paragraph: The only place needed to plan your next adventure with your kids
- link "Sign up":
  - /url: /signup
- link "Log in":
  - /url: /login
- link "Continue as a guest":
  - /url: /home/map
- navigation:
  - link "homepage":
    - /url: /home/map
    - img "homepage"
  - link "listpage":
    - /url: /home/list
    - img "listpage"
  - link "accountpage":
    - /url: /home/account
    - img "accountpage"
```

# Test source

```ts
  1  | import { expect } from "@playwright/test"
  2  | 
  3  | class LoginPage {
  4  |     constructor(page){
  5  |         this.page = page,
  6  |         this.username = page.getByPlaceholder("Username")
  7  |         this.password = page.getByPlaceholder("Password")
  8  |         this.submitButton = page.getByRole("button")
  9  |     }
  10 | 
  11 |     async goto() {
  12 |         await this.page.goto("https://project-delta-m6ba.onrender.com/home", { waitUntil: 'domcontentloaded' })
  13 |         const login = this.page.getByText("Log in")
  14 |         await login.click()
  15 |     }
  16 | 
  17 |     async fillRequiredFields({ username, password }){
  18 |         await this.username.fill(username)
  19 |         await this.password.fill(password)
  20 |     }
  21 | 
  22 |     async submit() {
  23 |         await this.submitButton.click()
  24 |     }
  25 | 
  26 |     async expectSuccess() {
> 27 |         await expect(this.page).toHaveURL("https://project-delta-m6ba.onrender.com")
     |                                 ^ Error: expect(page).toHaveURL(expected) failed
  28 |     }
  29 | 
  30 |     async expectFailure() {
  31 |         await expect(this.page).toHaveURL("https://project-delta-m6ba.onrender.com/login")
  32 |         //await expect(this.page.getByRole("alert")).toBeVisible()
  33 |     }
  34 | }
  35 | 
  36 | export { LoginPage }
```