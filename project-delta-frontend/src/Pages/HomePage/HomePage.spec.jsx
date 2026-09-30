/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import HomePage from '.';


describe("HomePage page", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Displays a title", () => {
        const title = screen.getByRole("heading");

        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toContain("Welcome to")
        expect(title.innerHTML).toContain("Child &amp; Me")
    });

    it("Has a description", () => {
        const text = screen.getByRole("paragraph");

        expect(text).toBeInTheDocument();
    });

    it("has a sign up link that navigates to the signup page", async () => {
        const link = screen.getByRole("link", {name: "Sign up"})

        expect(link).toBeInTheDocument();
        expect(link.innerHTML).toContain("Sign up")

        expect(window.location.href).not.toContain("/signup")
        await userEvent.click(link);
        expect(window.location.href).toContain("/signup")
    });

    it("has a log in link that navigates to the login page", async () => {
        const link = screen.getByRole("link", {name: "Log in"})

        expect(link).toBeInTheDocument();
        expect(link.innerHTML).toContain("Log in")

        expect(window.location.href).not.toContain("/login")
        await userEvent.click(link);
        expect(window.location.href).toContain("/login")
    });

    it("has a guest link that navigates to the guest page", async () => {
        const link = screen.getByRole("link", {name: "Continue as a guest"})

        expect(link).toBeInTheDocument();
        expect(link.innerHTML).toContain("Continue as a guest")

        expect(window.location.href).not.toContain("/home")
        await userEvent.click(link);
        expect(window.location.href).toContain("/home")
    });

});
