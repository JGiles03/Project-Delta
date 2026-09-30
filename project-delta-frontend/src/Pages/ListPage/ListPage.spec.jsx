/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { Placesprovider } from '../../context/PlacesContext';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import ListPage from '.';

vi.mock("../../Components/PlaceList", () => ({
    default: vi.fn(() => <div data-testid="mock-map">This is a PlaceList</div>)
}))

describe("ListPage page", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
        <Placesprovider>
             <ListPage />
        </Placesprovider>
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("exists and renders the PlaceList component", () => {
        const list = screen.getByTestId("list-page");

        expect(list).toBeInTheDocument();
        expect(list.childNodes.length).toBe(1)

        const placelist = screen.getByText("This is a PlaceList");
        expect(placelist).toBeInTheDocument();
    });

});
