// @ts-check
import { test, expect } from '@playwright/test';
import { MapPage } from "../Pages/MapPage/MapPageModel";
import { describe } from "node:test";

describe("Map page tests", () => {
  test('Allows the seachbar to be used', async ({ page }) => {
    const form = new MapPage(page)
    await form.goto()

  });

})
