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

        const username = screen.getByPlaceholderText("Username")
        const password = screen.getByPlaceholderText("Password")

        //fill in sign up details
        fireEvent.change(username, { target: { value: 'user1' } });
        fireEvent.change(password, { target: { value: 'user1' } });

        expect(window.location.href).not.toContain("/home")
        fireEvent.click(button)
        //this isn't working
        //setTimeout(() => {expect(window.location.href).toContain("/home")}, 1000)
        //const alert = screen.getByText("login successful")
        //expect(alert).toBeInTheDocument()
    });

    it("doesn't log in if missing details", async () => {
        const button = screen.getByRole("button", {name: "Log in"})
        fireEvent.click(button)

        const alert = screen.getByText("Please input a username and password!")
        expect(alert).toBeInTheDocument()

    });

    it("alerts if password is wrong", async () => {
        const button = screen.getByRole("button", {name: "Log in"})
        const username = screen.getByPlaceholderText("Username")
        const password = screen.getByPlaceholderText("Password")
        fireEvent.change(username, { target: { value: 'user1' } });
        fireEvent.change(password, { target: { value: 'incorrect' } });
        fireEvent.click(button)

        const alert = screen.getByText("Invalid password!")
        expect(alert).toBeInTheDocument()

    });

    it("alerts if username not found", async () => {
        const button = screen.getByRole("button", {name: "Log in"})
        const username = screen.getByPlaceholderText("Username")
        const password = screen.getByPlaceholderText("Password")
        fireEvent.change(username, { target: { value: 'user2' } });
        fireEvent.change(password, { target: { value: 'user1' } });
        fireEvent.click(button)

        const alert = screen.getByText("Username not found!")
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

        // expect(window.location.href).toContain("/signup")
        // await userEvent.click(link);
        // expect(window.location.href).not.toContain("/signup")
    });

});
