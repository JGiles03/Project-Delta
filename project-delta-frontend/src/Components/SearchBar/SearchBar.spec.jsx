/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import SearchBar from '.';


describe("Searchbar component", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
            <SearchBar />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Displays a form with input text and submit button", () => {
        //const form = screen.getByRole("form");
        const input = screen.getByRole("textbox", {name: ""});
        const submit = screen.getByRole("button", {type: "Search"});

        //expect(form).toBeInTheDocument();
        //expect(form.childNodes.length).toBe(2);
        expect(input).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
    });
    
});
