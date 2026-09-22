/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import MapPage from '.';


describe("HomePage page", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
            <MapPage />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Has a searchbar", () => {
        const search = screen.getByTestId("search-bar-overlay");

        expect(search).toBeInTheDocument();
    });

    it("Has a map", () => {
        const map = screen.getByTestId("map-container");

        expect(map).toBeInTheDocument();
    });


});
