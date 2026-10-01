/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import PlaceCard from '.';
import { FavouritesProvider } from '../../context/FavouritesContext';
import userEvent from '@testing-library/user-event';


describe("PlaceCard component", () => {

    const place = {
        name: "place1",
        address: "house, street, city, postcode",
        amenities: ["Accessible entrance", "Accessible toilet", "Changing facilities"]
    }

    beforeEach(() => {
        render(
        <BrowserRouter>
            <FavouritesProvider>
                <PlaceCard place={place} distanceKm={3}/>
            </FavouritesProvider>
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Displays the place name and distance", () => {
        const name = screen.getByTestId("place-card-name");
        const dist = screen.getByText("3.0 km away");

        expect(name).toBeInTheDocument()
        expect(name.innerHTML).toContain("place1")
        expect(dist).toBeInTheDocument()
    });

    it("Displays the correct amenities", () => {
        const amenities = screen.getByTestId("amenities");
        expect(amenities).toBeInTheDocument()
        
        expect(amenities.children.length).toBe(3)
        expect(amenities.children[0].title).toContain("Accessible entrance")
    });

    it("Allows user to favourite and unfavourite", async () => {
        const fav = screen.getByTestId("fav");
        expect(fav).toBeInTheDocument()
        expect(fav.innerHTML).toContain("♡")

        await userEvent.click(fav)
        //expect(fav.innerHTML).toContain("♥")

    });

    it("Has a link to the venue page", async () => {
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href");
        await userEvent.click(link)

    });

    
});
