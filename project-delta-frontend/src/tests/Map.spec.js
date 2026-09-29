// @ts-check
import { test, expect } from '@playwright/test';
import { MapPage } from "../Pages/MapPage/MapPageModel";
import { describe } from "node:test";

describe("Map page tests", () => {
  test('Displays the map', async ({ page }) => {
    const form = new MapPage(page)
    await form.goto()
  });

})
