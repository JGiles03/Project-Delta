import { expect } from "@playwright/test"

class MapPage {
    constructor(page){
        this.page = page
    }

    async goto() {
        await this.page.goto("https://tiny-lolly-77a880.netlify.app/", { waitUntil: 'domcontentloaded' })
        const log = this.page.getByText("Log in")
        await log.click()
        await this.page.getByPlaceholder("Email").fill("test1@mail.com")
        await this.page.getByPlaceholder("Password").fill("password")
        await this.page.getByRole("button").click()
    }

}

export { MapPage }