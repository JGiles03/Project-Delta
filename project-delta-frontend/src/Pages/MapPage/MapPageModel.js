import { expect } from "@playwright/test"

class MapPage {
    constructor(page){
        this.page = page
        
    }

    async goto() {
        await this.page.goto("https://project-delta-m6ba.onrender.com/home/map", { waitUntil: 'domcontentloaded' })
    }

}

export { MapPage }