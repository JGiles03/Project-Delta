/* eslint-env jest */
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

    beforeEach(() => {
        render(
        <BrowserRouter>
             <MapPage />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Has a map", () => {
        const map = screen.getByTestId("mock-map");

        expect(map).toBeInTheDocument();
        expect(map.innerHTML).toContain("This is a map")
    });

});
