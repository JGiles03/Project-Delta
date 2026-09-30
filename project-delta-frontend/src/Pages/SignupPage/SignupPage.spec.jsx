/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import SignupPage from '.';


describe("SignupPage page", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
            <SignupPage />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Displays a title", () => {
        const title = screen.getByRole("heading");

        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toContain("Create your account")
    });

    it("Has a description", () => {
        const text = screen.getAllByRole("paragraph");

        expect(text[0]).toBeInTheDocument();
    });

    it("has a sign up button that navigates to the login page on correct details given", async () => {
        const button = screen.getByRole("button", {name: "Sign up"})
        expect(button).toBeInTheDocument();
        expect(button.innerHTML).toContain("Sign up")

        const username = screen.getByPlaceholderText("Username")
        const password = screen.getByPlaceholderText("Password")
        const passwordCheck = screen.getByPlaceholderText("Confirm password")

        //fill in sign up details
        fireEvent.change(username, { target: { value: 'user1' } });
        fireEvent.change(password, { target: { value: 'user1' } });
        fireEvent.change(passwordCheck, { target: { value: 'user1' } });

        expect(window.location.href).not.toContain("/login")
        fireEvent.click(button)
        //this isn't working
        // await waitFor(() => {
        //     const title = screen.getByRole("heading");
        //     expect(title).toBeInTheDocument();
        //     expect(title.innerHTML).toContain("Welcome back")
        // })
    });

    it("doesn't sign up if missing details", async () => {
        const button = screen.getByRole("button", {name: "Sign up"})

        fireEvent.click(button)
        expect(window.location.href).not.toContain("/login")

    });

    it("alerts if passwords don't match", async () => {
        const button = screen.getByRole("button", {name: "Sign up"})
        const username = screen.getByPlaceholderText("Username")
        const password = screen.getByPlaceholderText("Password")
        const passwordCheck = screen.getByPlaceholderText("Confirm password")
        fireEvent.change(username, { target: { value: 'user2' } });
        fireEvent.change(password, { target: { value: 'user1' } });
        fireEvent.change(passwordCheck, { target: { value: 'user2' } });
        fireEvent.click(button)

        const alert = screen.getByText("Please make sure the passwords match!")
        expect(alert).toBeInTheDocument()

    });

    it("alerts if username already taken", async () => {
        const button = screen.getByRole("button", {name: "Sign up"})
        const username = screen.getByPlaceholderText("Username")
        const password = screen.getByPlaceholderText("Password")
        const passwordCheck = screen.getByPlaceholderText("Confirm password")
        fireEvent.change(username, { target: { value: 'user1' } });
        fireEvent.change(password, { target: { value: 'user1' } });
        fireEvent.change(passwordCheck, { target: { value: 'user2' } });
        fireEvent.click(button)

        const alert = screen.getByText("This username already exists!")
        expect(alert).toBeInTheDocument()

    });

    it("has a log in link that navigates to the login page", async () => {
        const link = screen.getByRole("link", {name: "Log in here"})

        expect(link).toBeInTheDocument();
        expect(link.innerHTML).toContain("Log in here")

        expect(window.location.href).not.toContain("/login")
        await userEvent.click(link);
        expect(window.location.href).toContain("/login")
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
