/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach, vi, beforeAll, afterAll } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import AccountPage from '.';
import { getUserById } from '../../services/users';
import { signOut } from '../../services/auth';
import { FavouritesProvider } from '../../context/FavouritesContext';

vi.mock("../../services/users", () => ({
  getUserById: vi.fn(() => ({ 
    id: 1, 
    email: "test1@mail.com", 
    role: null, 
    preferences: ["Accessible entrance", "Accessible toilet", "Changing facilities"], 
    created_at: "2026-09-28T14:53:21.333Z" 
    }))
}))

vi.mock("../../services/auth", () => ({
  signOut: vi.fn()
}))

describe("AccountPage page", () => {
    let mockStorage;
    const realStorage = window.localStorage;

    beforeAll(() => {
        mockStorage = {
            store: {
                id: 1,
                token: "becusbc78eg8g38"
            },
            setStore(newStore) {
                this.store = newStore
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
        window.localStorage = mockStorage;
    })

    const renderPage = () => {
        render(
            <BrowserRouter>
                <FavouritesProvider>
                    <AccountPage />
                </FavouritesProvider>
            </BrowserRouter>);
    }

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
        mockStorage.setStore({
            id: 1,
            token: "becusbc78eg8g38"
        })
    });

    afterAll(() => {
        window.localStorage = realStorage 
    })
    
    it("Displays logged in Email, and member status", async () => {
        renderPage()
        expect(getUserById).toHaveBeenCalled()
        const title = await screen.findByText("test1@mail.com");
        const text = await screen.findAllByRole("paragraph");

        expect(title).toBeInTheDocument();
        expect(text[0]).toBeInTheDocument();
        expect(text[0].innerHTML).toContain("Member since");
    });

    it("Shows user's selected preferences", async () => {
        renderPage()
        expect(getUserById).toHaveBeenCalled()
        const preferences = await screen.findByText("Your preferences")
        const list = await screen.findByTestId("preferences-list")

        expect(preferences).toBeInTheDocument();
        expect(list.children.length).toBe(3)
    });

    it("Allows the user to change their preferences", async () => {
        renderPage()
        expect(getUserById).toHaveBeenCalled()
        const change = await screen.findByText("Change your amenities")
        expect(change).toBeInTheDocument();

        await userEvent.click(change);
        expect(window.location.href).toContain("/preferences")
    });

    it("displays user's reviews", async () => {
        renderPage()
        expect(getUserById).toHaveBeenCalled()
        const reviews = await screen.findByText("Your reviews")
        expect(reviews).toBeInTheDocument();
    });

    it("allows a user to log out", async () => {
        renderPage()
        expect(getUserById).toHaveBeenCalled()
        const quit = await screen.findByRole("button", {name: "Sign Out"})
        expect(quit).toBeInTheDocument()
        
        await userEvent.click(quit);
        expect(signOut).toHaveBeenCalled();
        expect(window.location.href).toContain("/home")
    });

    it("Shows login when nothing in local storage", async () => {
        mockStorage.clear(); 
        renderPage()

        const title = await screen.findByRole("heading", { name: "You're not signed in" });
        const text = screen.getByText("Log in to leave reviews and manage your account.");
        
        expect(title).toBeInTheDocument();
        expect(text).toBeInTheDocument();

        const login = screen.getByRole("link", { name: "Log in" });
        const signup = screen.getByRole("link", { name: "Create an account" });

        expect(login).toHaveAttribute("href", "/login");
        expect(signup).toHaveAttribute("href", "/signup");

        expect(getUserById).not.toHaveBeenCalled();
    });

});
