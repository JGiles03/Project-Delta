/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)
import MapPage from '.';

vi.mock("../../Components/SearchBar", () => ({
    default: vi.fn(() => <div data-testid="mock-search">Search Here</div>)
}))

vi.mock("../../Components/Map", () => ({
    default: vi.fn(() => <div data-testid="mock-map">This is a map</div>)
}))

describe("MapPage page", () => {

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
        const search = screen.getByTestId("mock-search");

        expect(search).toBeInTheDocument();
        expect(search.innerHTML).toContain("Search Here")
    });

    it("Has a map", () => {
        const map = screen.getByTestId("mock-map");

        expect(map).toBeInTheDocument();
        expect(map.innerHTML).toContain("This is a map")
    });

});
