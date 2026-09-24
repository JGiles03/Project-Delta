import { expect } from "@playwright/test"

class HomePage {
    constructor(page){
        this.page = page,
        this.loginButton = page.getByText("Log in")
        this.signupButton = page.getByText("Sign up")
        this.guestButton = page.getByText("Continue as a guest")
        this.map = page.getByAltText("homepage")
        this.list = page.getByAltText("listpage")
        this.account = page.getByAltText("accountpage")
    }

    async goto() {
        await this.page.goto("https://project-delta-m6ba.onrender.com/home", { waitUntil: 'domcontentloaded' })
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

    async clickMap() {
        await this.map.click()
    }

    async clickList() {
        await this.list.click()
    }

    async clickAccount() {
        await this.account.click()
    }

    async expectLogin() {
        await expect(this.page).toHaveURL("https://project-delta-m6ba.onrender.com/login")
    }

    async expectSignup() {
        await expect(this.page).toHaveURL("https://project-delta-m6ba.onrender.com/signup")
        //await expect(this.page.getByRole("alert")).toBeVisible()
    }

    async expectMap() {
        await expect(this.page).toHaveURL("https://project-delta-m6ba.onrender.com/home/map")
    }

    async expectList() {
        await expect(this.page).toHaveURL("https://project-delta-m6ba.onrender.com/home/list")
    }

    async expectAccount() {
        await expect(this.page).toHaveURL("https://project-delta-m6ba.onrender.com/home/account")
    }

    async expectFailure() {
        await expect(this.page).toHaveURL("https://project-delta-m6ba.onrender.com/home")
    }


}

export { HomePage }