/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import BusinessPage from '.';


describe("BusinessPage page", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
            <BusinessPage />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    //! Waiting on page
    //? Wonder what other colours there are
    //TODO Add tests
    it("Has a title and description", async () => {
        // const title = await screen.findByText("Business Dashboard");
        // const text = await screen.findByText("Understand how parents are discovering and evaluating your venue.");

        // expect(title).toBeInTheDocument();
        // expect(text).toBeInTheDocument();
    });


});
