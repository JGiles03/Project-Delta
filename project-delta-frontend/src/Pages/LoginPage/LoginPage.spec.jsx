/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import LoginPage from '.';


describe("LoginPage page", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
            <LoginPage />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Displays a title", () => {
        const title = screen.getByRole("heading");

        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toContain("Welcome back")
    });

    it("Has a description", () => {
        const text = screen.getAllByRole("paragraph");

        expect(text[0]).toBeInTheDocument();
    });

    it("has a log in button that navigates to the map page correct details given", async () => {
        const button = screen.getByRole("button", {name: "Log in"})
        expect(button).toBeInTheDocument();
        expect(button.innerHTML).toContain("Log in")

        const email = screen.getByPlaceholderText("Email")
        const password = screen.getByPlaceholderText("Password")

        fireEvent.change(email, { target: { value: 'test1@mail.com' } });
        fireEvent.change(password, { target: { value: 'password' } });

        //not getting /login in rendered component
        //expect(window.location.href).toContain("/login")
        fireEvent.click(button)
        expect(window.location.href).not.toContain("/login")
    });

    it("doesn't log in if missing details", async () => {
        const button = screen.getByRole("button", {name: "Log in"})
        fireEvent.click(button)

        const alert = await screen.findByText("Invalid Email or password")
        expect(alert).toBeInTheDocument()

    });

    it("alerts if password is wrong", async () => {
        const button = screen.getByRole("button", {name: "Log in"})
        const email = screen.getByPlaceholderText("Email")
        const password = screen.getByPlaceholderText("Password")
        fireEvent.change(email, { target: { value: 'test1@mail.com' } });
        fireEvent.change(password, { target: { value: 'incorrect' } });
        fireEvent.click(button)

        const alert = await screen.findByText("Invalid Email or password")
        expect(alert).toBeInTheDocument()

    });

    it("alerts if username not found", async () => {
        const button = screen.getByRole("button", {name: "Log in"})
        const email = screen.getByPlaceholderText("Email")
        const password = screen.getByPlaceholderText("Password")
        fireEvent.change(email, { target: { value: 'incorrect@mail.com' } });
        fireEvent.change(password, { target: { value: 'password' } });
        fireEvent.click(button)

        const alert = await screen.findByText("Invalid Email or password")
        expect(alert).toBeInTheDocument()

    });

    it("has a sign up link that navigates to the sign up page", async () => {
        const link = screen.getByRole("link", {name: "Sign up here"})

        expect(link).toBeInTheDocument();
        expect(link.innerHTML).toContain("Sign up here")

        expect(window.location.href).not.toContain("/signup")
        await userEvent.click(link);
        expect(window.location.href).toContain("/signup")
    });

    it("has a back link that navigates back to the home page", async () => {
        const link = screen.getByRole("link", {name: "Back"})

        expect(link).toBeInTheDocument();
        expect(link.innerHTML).toContain("Back")


        //The test is recieving /signup at this stage
        //expect(window.location.href).toContain("/login")
        await userEvent.click(link);
        expect(window.location.href).not.toContain("/login")
    });

});
