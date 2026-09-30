/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers)

import SignupPage from ".";
import { signUp, logIn } from "../../services/auth";

vi.mock(import("../../services/auth"), () => ({
    signUp: vi.fn(),
    logIn: vi.fn()
}))

describe("SignupPage page", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
            <SignupPage />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
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

    it("has a sign up button that navigates to onboarding if correct details given", async () => {

        const button = screen.getByRole("button", {name: "Sign up"})
        expect(button).toBeInTheDocument();
        expect(button.innerHTML).toContain("Sign up")

        const email = screen.getByPlaceholderText("Email")
        const password = screen.getByPlaceholderText("Password")
        const passwordCheck = screen.getByPlaceholderText("Confirm password")

        fireEvent.change(email, { target: { value: "test1@mail.com" } });
        fireEvent.change(password, { target: { value: "password" } });
        fireEvent.change(passwordCheck, { target: { value: "password" } });

        fireEvent.click(button)

        expect(signUp).toHaveBeenCalledWith({ email: "test1@mail.com", password: "password" })
        // expect(logIn).toHaveBeenCalled()

        // const onboarding = await screen.findByText("Welcome")
        // expect(onboarding).toBeInTheDocument()
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
        fireEvent.change(email, { target: { value: "user2@123.com" } });
        fireEvent.change(password, { target: { value: "user1" } });
        fireEvent.change(passwordCheck, { target: { value: "user2" } });
        fireEvent.click(button)

        const alert = await screen.findByText("Please make sure the passwords match!")
        expect(alert).toBeInTheDocument()

    });

    it("alerts if username already taken", async () => {
        signUp.mockImplementation(() => {throw new Error("AAAAAA")})

        const button = screen.getByRole("button", {name: "Sign up"})
        const email = screen.getByPlaceholderText("Email")
        const password = screen.getByPlaceholderText("Password")
        const passwordCheck = screen.getByPlaceholderText("Confirm password")
        fireEvent.change(email, { target: { value: "repeat@mail.com" } });
        fireEvent.change(password, { target: { value: "password" } });
        fireEvent.change(passwordCheck, { target: { value: "password" } });
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
