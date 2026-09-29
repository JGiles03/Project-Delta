/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import BusinessPage from '.';


describe("BusinessPage page", () => {

    //!Need to mock data

    beforeEach(() => {
        render(
        <BrowserRouter>
            <BusinessPage />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Has a title and description", () => {
        const title = screen.getByText("Business Dashboard");
        const text = screen.getByText("Understand how parents are discovering and evaluating your venue.");

        expect(title).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });


});
