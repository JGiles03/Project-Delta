import { expect } from "@playwright/test"

class SignupPage {
    constructor(page){
        this.page = page,
        this.username = page.getByPlaceholder("Username")
        this.password = page.getByRole('textbox', { name: 'Password', exact: true })
        this.cpass = page.getByRole('textbox', { name: 'Confirm password' })
        this.submitButton = page.getByRole("button")
    }

    async goto() {
        await this.page.goto("https://tiny-lolly-77a880.netlify.app/signup", { waitUntil: 'domcontentloaded' })
        // const login = this.page.getByText("Sign up")
        // await login.click()
    }

    async fillRequiredFields({ username, password, cpass }){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.cpass.fill(cpass)
    }

    async submit() {
        await this.submitButton.click()
    }

    async expectSuccess() {
        await expect(this.page).toHaveURL("https://tiny-lolly-77a880.netlify.app/login")
    }

    async expectFailure() {
        await expect(this.page).toHaveURL("https://tiny-lolly-77a880.netlify.app/signup")
        //await expect(this.page.getByRole("alert")).toBeVisible()
    }
}

export { SignupPage }