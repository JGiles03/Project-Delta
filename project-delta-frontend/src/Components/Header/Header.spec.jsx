/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import Header from '.';


describe("Header component", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Displays a nav bar with three children", () => {
        const nav = screen.getByRole("navigation");

        expect(nav).toBeInTheDocument();
        expect(nav.childNodes.length).toBe(3);
    });

    it("Changes location to account when the correct navlink is clicked", async () => {
        expect(window.location.href).not.toContain("/account")
        const account = screen.getByText("Account");
        await userEvent.click(account);
        expect(window.location.href).toContain("/account")
    });

    it("Changes location to list when the correct navlink is clicked", async () => {
        expect(window.location.href).not.toContain("/list")
        const list = screen.getByText("List");
        await userEvent.click(list);
        expect(window.location.href).toContain("/list")
    });
});
