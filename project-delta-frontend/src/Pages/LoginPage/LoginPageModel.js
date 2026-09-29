import { expect } from "@playwright/test"

class LoginPage {
    constructor(page){
        this.page = page,
        this.username = page.getByPlaceholder("Email")
        this.password = page.getByPlaceholder("Password")
        this.submitButton = page.getByRole("button")
    }

    async goto() {
        await this.page.goto("https://tiny-lolly-77a880.netlify.app/login", { waitUntil: 'domcontentloaded' })
        // const login = this.page.getByText("Log in")
        // await login.click()
        // await this.page.goto("https://project-delta-m6ba.onrender.com/login", { waitUntil: 'domcontentloaded' })
    }

    async fillRequiredFields({ username, password }){
        await this.username.fill(username)
        await this.password.fill(password)
    }

    async submit() {
        await this.submitButton.click()
    }

    async expectSuccess() {
        await expect(this.page).toHaveURL("https://tiny-lolly-77a880.netlify.app/map")
    }

    async expectFailure() {
        await expect(this.page).toHaveURL("https://tiny-lolly-77a880.netlify.app/login")
        //await expect(this.page.getByRole("alert")).toBeVisible()
    }
}

export { LoginPage }