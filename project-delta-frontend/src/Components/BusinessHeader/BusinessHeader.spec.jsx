/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import BusinessHeader from '.';


describe("BusinessHeader component", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
            <BusinessHeader />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Displays a nav bar with two children", () => {
        const nav = screen.getByRole("navigation");

        expect(nav).toBeInTheDocument();
        expect(nav.childNodes.length).toBe(2);
    });

    it("Changes location to account when the correct navlink is clicked", async () => {
        expect(window.location.href).not.toContain("/account")
        const account = screen.getByAltText("accountpage");
        await userEvent.click(account);
        expect(window.location.href).toContain("/account")
    });

    it("Changes location to list when the correct navlink is clicked", async () => {
        expect(window.location.href).not.toContain("/business")
        const list = screen.getByAltText("listpage");
        await userEvent.click(list);
        expect(window.location.href).toContain("/business")
    });
});
