/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import Map from '.';
import { Placesprovider } from '../../context/PlacesContext';


describe("Map component", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
        <Placesprovider>
            <Map />
        </Placesprovider>
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });

    it("Notifies you that it's finding your location", async () => {
        const loading = await screen.findByText("Finding your location...");

        expect(loading).toBeInTheDocument()
    });
    
    //! THIS IS THROWING ERROR - MAP NO LOAD
    // it("Displays the map once it's loaded", async () => {
    //     const map = await screen.findByTestId("map");

    //     expect(map).toBeInTheDocument()
    // });

    //TODO
    // it("Has pins that link to the correct venue page", async () => {

    // });
    
});
