/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import PlaceCard from '.';


describe("PlaceCard component", () => {

    const place = {
        name: "place1",
        address: "house, street, city, postcode"
    }

    beforeEach(() => {
        render(
        <BrowserRouter>
            <PlaceCard place={place}/>
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Displays the place name and address", () => {
        const name = screen.getByTestId("place-card-name");
        const address = screen.getByRole("paragraph");

        expect(name).toBeInTheDocument()
        expect(name.innerHTML).toContain("place1")
        expect(address).toBeInTheDocument()
        expect(address.innerHTML).toContain("house, street, city, postcode")
    });

    //mock place to pass to the card
    
});
