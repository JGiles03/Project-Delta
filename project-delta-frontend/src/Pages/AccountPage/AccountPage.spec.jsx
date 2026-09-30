/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach, vi, beforeAll } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import AccountPage from '.';
import { getUserById } from '../../services/users';
import { signOut } from '../../services/auth';

vi.mock(import("../../services/users"), () => ({
  getUserById: vi.fn(() => ({ 
    id: 1, 
    email: "test1@mail.com", 
    role: null, 
    preferences: ["Accessible entrance", "Accessible toilet", "Changing facilities"], 
    created_at: "2026-09-28T14:53:21.333Z" 
    }))
}))

vi.mock(import("../../services/auth"), () => ({
  signOut: vi.fn()
}))

describe("AccountPage page", () => {
    let originalStorage;

    beforeAll(() => {
        originalStorage = window.localStorage;
        window.localStorage = {
            store: {
                userId: 1,
                token: "Bearer becusbc78eg8g38"
            },
            getItem(key) {
            return this.store[key] ?? null;
            },
            setItem(key, value) {
            this.store[key] = value;
            },
            removeItem(key) {
            delete this.store[key];
            },
            clear() {
            this.store = {};
            },
        };
    })

    beforeEach(() => {
        render(
        <BrowserRouter>
            <AccountPage />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Displays logged in Email, and member status", async () => {
        const title = await screen.findByText("test1@mail.com");
        const text = await screen.findAllByRole("paragraph");

        expect(getUserById).toHaveBeenCalled();
        expect(title).toBeInTheDocument();
        expect(text[0]).toBeInTheDocument();
        expect(text[0].innerHTML).toContain("Member since");
    });

    it("Shows user's selected preferences", async () => {
        const preferences = await screen.findByText("Your preferences")
        const list = await screen.findByTestId("preferences-list")

        expect(preferences).toBeInTheDocument();
        expect(list.children.length).toBe(3)
    });

    it("Allows the user to change their preferences", async () => {
        const change = await screen.findByText("Change your amenities")
        expect(change).toBeInTheDocument();

        await userEvent.click(change);
        expect(window.location.href).toContain("/preferences")
    });

    it("displays user's reviews", async () => {
        const reviews = await screen.findByText("Your reviews")
        expect(reviews).toBeInTheDocument();
    });

    it("allows a user to log out", async () => {
        const quit = await screen.findByRole("button", {name: "Sign Out"})
        expect(quit).toBeInTheDocument()
        
        await userEvent.click(quit);
        expect(signOut).toHaveBeenCalled();
        expect(window.location.href).toContain("/home")
    });

});
