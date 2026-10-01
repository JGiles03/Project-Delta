import { expect } from "@playwright/test"

class HomePage {
    constructor(page){
        this.page = page,
        this.loginButton = page.getByText("Log in")
        this.signupButton = page.getByText("Sign up")
        this.guestButton = page.getByText("Continue as a guest")
    }

    async goto() {
        await this.page.goto("https://tiny-lolly-77a880.netlify.app", { waitUntil: 'domcontentloaded' })
    }

    async login() {
        await this.loginButton.click()
    }

    async signup() {
        await this.signupButton.click()
    }

    async guest() {
        await this.guestButton.click()
    }

    async expectLogin() {
        await expect(this.page).toHaveURL("https://tiny-lolly-77a880.netlify.app/login")
    }

    async expectSignup() {
        await expect(this.page).toHaveURL("https://tiny-lolly-77a880.netlify.app/signup")
        //await expect(this.page.getByRole("alert")).toBeVisible()
    }

    async expectList() {
        await expect(this.page).toHaveURL("https://tiny-lolly-77a880.netlify.app/list")
    }

    async expectFailure() {
        await expect(this.page).toHaveURL("https://tiny-lolly-77a880.netlify.app/home")
    }


}

export { HomePage }