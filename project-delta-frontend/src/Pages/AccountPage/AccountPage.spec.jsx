/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import AccountPage from '.';


describe("AccountPage page", () => {

    //!Need to mock data

    beforeEach(() => {
        render(
        <BrowserRouter>
            <AccountPage />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Displays logged in Email, and member status", () => {
        const title = screen.getByRole("header");
        const text = screen.getAllByRole("paragraph");

        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toContain("test1@mail.com")
        expect(text[0]).toBeInTheDocument();
        expect(text[0].innerHTML).toContain("Member since");
    });

    it("Shows user's selected preferences", async () => {
        const preferences = screen.getByText("Your preferences")
        //! add in rendering of preferences and check

        expect(preferences).toBeInTheDocument();
    });

    it("Allows the user to change their preferences", async () => {
        const change = screen.getByText("Change your amenities")
        expect(change).toBeInTheDocument();

        //! Check it takes to /preferences        
    });

    it("displays user's reviews", async () => {
        
    });

    it("allows a user to log out", async () => {

    });

});
