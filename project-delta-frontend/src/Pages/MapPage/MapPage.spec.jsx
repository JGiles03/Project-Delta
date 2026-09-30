/* eslint-env jest */
<<<<<<< HEAD
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)
import MapPage from '.';

vi.mock("../../Components/Map", () => ({
    default: vi.fn(() => <div data-testid="mock-map">This is a map</div>)
}))

describe("MapPage page", () => {
=======
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import MapPage from '.';


describe("HomePage page", () => {
>>>>>>> dev

    beforeEach(() => {
        render(
        <BrowserRouter>
<<<<<<< HEAD
             <MapPage />
=======
            <MapPage />
>>>>>>> dev
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
<<<<<<< HEAD
    it("Has a map", () => {
        const map = screen.getByTestId("mock-map");

        expect(map).toBeInTheDocument();
        expect(map.innerHTML).toContain("This is a map")
    });

=======
    it("Has a searchbar", () => {
        const search = screen.getByTestId("search-bar-overlay");

        expect(search).toBeInTheDocument();
    });

    it("Has a map", () => {
        const map = screen.getByTestId("map-container");

        expect(map).toBeInTheDocument();
    });


>>>>>>> dev
});
