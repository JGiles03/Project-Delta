# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: src\tests\Home.spec.js >> doesn't allow clicking the nav links if not logged in
- Location: src\tests\Home.spec.js:30:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "https://project-delta-m6ba.onrender.com/home"
Received: "https://project-delta-m6ba.onrender.com/home/map"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html lang="en">…</html>
       - unexpected value "https://project-delta-m6ba.onrender.com/home/map"

```

```yaml
- textbox "Restaurant"
- button "Search"
- text: Unable to retrieve your location.
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
  3  | class HomePage {
  4  |     constructor(page){
  5  |         this.page = page,
  6  |         this.loginButton = page.getByText("Log in")
  7  |         this.signupButton = page.getByText("Sign up")
  8  |         this.guestButton = page.getByText("Continue as a guest")
  9  |         this.map = page.getByAltText("homepage")
  10 |         this.list = page.getByAltText("listpage")
  11 |         this.account = page.getByAltText("accountpage")
  12 |     }
  13 | 
  14 |     async goto() {
  15 |         await this.page.goto("https://project-delta-m6ba.onrender.com/home", { waitUntil: 'domcontentloaded' })
  16 |     }
  17 | 
  18 |     async login() {
  19 |         await this.loginButton.click()
  20 |     }
  21 | 
  22 |     async signup() {
  23 |         await this.signupButton.click()
  24 |     }
  25 | 
  26 |     async guest() {
  27 |         await this.guestButton.click()
  28 |     }
  29 | 
  30 |     async clickMap() {
  31 |         await this.map.click()
  32 |     }
  33 | 
  34 |     async clickList() {
  35 |         await this.list.click()
  36 |     }
  37 | 
  38 |     async clickAccount() {
  39 |         await this.account.click()
  40 |     }
  41 | 
  42 |     async expectLogin() {
  43 |         await expect(this.page).toHaveURL("https://project-delta-m6ba.onrender.com/login")
  44 |     }
  45 | 
  46 |     async expectSignup() {
  47 |         await expect(this.page).toHaveURL("https://project-delta-m6ba.onrender.com/signup")
  48 |         //await expect(this.page.getByRole("alert")).toBeVisible()
  49 |     }
  50 | 
  51 |     async expectMap() {
  52 |         await expect(this.page).toHaveURL("https://project-delta-m6ba.onrender.com/home/map")
  53 |     }
  54 | 
  55 |     async expectList() {
  56 |         await expect(this.page).toHaveURL("https://project-delta-m6ba.onrender.com/home/list")
  57 |     }
  58 | 
  59 |     async expectAccount() {
  60 |         await expect(this.page).toHaveURL("https://project-delta-m6ba.onrender.com/home/account")
  61 |     }
  62 | 
  63 |     async expectFailure() {
> 64 |         await expect(this.page).toHaveURL("https://project-delta-m6ba.onrender.com/home")
     |                                 ^ Error: expect(page).toHaveURL(expected) failed
  65 |     }
  66 | 
  67 | 
  68 | }
  69 | 
  70 | export { HomePage }
```