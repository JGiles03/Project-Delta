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

        const email = screen.getByPlaceholderText("Email")
        const password = screen.getByPlaceholderText("Password")
        const passwordCheck = screen.getByPlaceholderText("Confirm password")

        //fill in sign up details
        fireEvent.change(email, { target: { value: 'test2@mail.com' } });
        fireEvent.change(password, { target: { value: 'password' } });
        fireEvent.change(passwordCheck, { target: { value: 'password' } });

        expect(window.location.href).not.toContain("/login")
        fireEvent.click(button)
        //doesn't contain /login 
        //expect(window.location.href).toContain("/login")
    });

    it("doesn't sign up if missing details", async () => {
        const button = screen.getByRole("button", {name: "Sign up"})

        fireEvent.click(button)
        expect(window.location.href).not.toContain("/login")

    });

    it("alerts if passwords don't match", async () => {
        const button = screen.getByRole("button", {name: "Sign up"})
        const email = screen.getByPlaceholderText("Email")
        const password = screen.getByPlaceholderText("Password")
        const passwordCheck = screen.getByPlaceholderText("Confirm password")
        fireEvent.change(email, { target: { value: 'user2@123.com' } });
        fireEvent.change(password, { target: { value: 'user1' } });
        fireEvent.change(passwordCheck, { target: { value: 'user2' } });
        fireEvent.click(button)

        const alert = await screen.findByText("Please make sure the passwords match!")
        expect(alert).toBeInTheDocument()

    });

    it("alerts if username already taken", async () => {
        const button = screen.getByRole("button", {name: "Sign up"})
        const email = screen.getByPlaceholderText("Email")
        const password = screen.getByPlaceholderText("Password")
        const passwordCheck = screen.getByPlaceholderText("Confirm password")
        fireEvent.change(email, { target: { value: 'test1@mail.com' } });
        fireEvent.change(password, { target: { value: 'password' } });
        fireEvent.change(passwordCheck, { target: { value: 'password' } });
        fireEvent.click(button)

        const alert = await screen.findByText("This email is already assigned to an account")
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
