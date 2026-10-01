/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import PlaceList from '.';
import { PlacesContext } from '../../context/PlacesContext';
import userEvent from '@testing-library/user-event';
import { FavouritesProvider } from '../../context/FavouritesContext';


describe("PlaceList component", () => {

    const places = [
        {id: 1,name: "place1", lat: 51.8099, lng: -0.2238, category: ["cafe"], amenities: ["Accessible entrance"]},
        {id: 2,name: "place2", lat: 51.8099, lng: -0.2238, category: ["restaurant"], amenities: ["Accessible entrance"]},
        {id: 3,name: "place3", lat: 51.8099, lng: -0.2238, category: ["museum"], amenities: ["Accessible entrance"]},
        {id: 4,name: "place4", lat: 51.8099, lng: -0.2238, category: ["playground"], amenities: ["Accessible entrance"]},
        {id: 5,name: "place5", lat: 51.8099, lng: -0.2238, category: ["cafe"], amenities: ["Accessible entrance"]}
        ]
    const placesByCategory =  {
            cafe: [{id: 1,name: "place1", lat: 51.8099, lng: -0.2238, category: ["cafe"], amenities: ["Accessible entrance"]},
                {id: 5,name: "place5", lat: 51.8099, lng: -0.2238, category: ["cafe"], amenities: ["Accessible entrance"]}],
            restaurant: [{id: 2,name: "place2", lat: 51.8099, lng: -0.2238, category: ["restaurant"], amenities: ["Accessible entrance"]}],
            museum: [{id: 3,name: "place3", lat: 51.8099, lng: -0.2238, category: ["museum"], amenities: ["Accessible entrance"]}],
            playground: [{id: 4,name: "place4", lat: 51.8099, lng: -0.2238, category: ["playground"], amenities: ["Accessible entrance"]}]
        }      
    const userLocation =  {lat: 51.8098, lng:-0.2237}
    const isLoading = false
    const error = ""

    const renderPage = ((changes = {}) => {
        const defaults = {places, placesByCategory, userLocation, isLoading, error}
        const changed = {...defaults, ...changes}
        render(
            <BrowserRouter>
                <FavouritesProvider>
                <PlacesContext.Provider value={changed}>
                    <PlaceList />
                </PlacesContext.Provider>
                </FavouritesProvider>
            </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });

    it("Notifies you that it's loading the venues", async () => {
        renderPage({ isLoading: true })
        const loading = await screen.findByText("Loading venues...");

        expect(loading).toBeInTheDocument()
    });
    
    it("Displays a list containing categorised places", () => {
        renderPage()
        const list = screen.getByTestId("list");
        expect(list).toBeInTheDocument()
        expect(list.children.length).toBe(4)
        
    });

    it("Displays a search bar and filter button that toggles amenities", async () => {
        renderPage()
        const search = screen.getByPlaceholderText("Search by name");
        const button = screen.getByText("☰")
        expect(search).toBeInTheDocument()
        expect(button).toBeInTheDocument()

        fireEvent.change(search, { target: { value: "cafe" } });
        await userEvent.click(button)
        const filters = screen.getByText("Filters")
        expect(filters).toBeInTheDocument()

        const amenities = screen.getByTestId("amenities-filter")
        expect(amenities).toBeInTheDocument()
        expect(amenities.children[0]).toHaveClass("filter-chip")
        expect(amenities.children[1]).toHaveClass("filter-chip")

        await userEvent.click(amenities.children[0])
        await userEvent.click(amenities.children[1])
        expect(amenities.children[0]).toHaveClass("filter-chip active")
        expect(amenities.children[1]).toHaveClass("filter-chip active")
    });
    
    it("Allows you to toggle the distance", async () => {
        renderPage()
        const button = screen.getByText("☰")
        expect(button).toBeInTheDocument()

        await userEvent.click(button)
        const dist = screen.getByText("Distance")
        expect(dist).toBeInTheDocument()

        const distance = screen.getByTestId("distance-filter")
        expect(distance).toBeInTheDocument()
        expect(distance.children[0]).toHaveClass("filter-chip")

        await userEvent.click(distance.children[0])
        expect(distance.children[0]).toHaveClass("filter-chip active")
    });
    
    it("Allows you to reset the filters", async () => {
        renderPage()
        const button = screen.getByText("☰")
        expect(button).toBeInTheDocument()

        await userEvent.click(button)

        const amenities = screen.getByTestId("amenities-filter")
        expect(amenities).toBeInTheDocument()
        expect(amenities.children[0]).toHaveClass("filter-chip")
        await userEvent.click(amenities.children[0])
        expect(amenities.children[0]).toHaveClass("filter-chip active")

        const reset = screen.getByText("Clear all")
        await userEvent.click(reset)
        expect(amenities.children[0]).toHaveClass("filter-chip")
    });


    it("Allows you scroll through the venues", async () => {
        renderPage()
        const buttonRight = screen.getAllByText("›")
        expect(buttonRight[0]).toBeInTheDocument()
        const buttonLeft = screen.getAllByText("‹")
        expect(buttonLeft[0]).toBeInTheDocument()

        const slide1 = screen.getByTestId("carousel-slide 1");
        expect(slide1).toBeInTheDocument()

        await userEvent.click(buttonRight[0])
        const slide2 = screen.getByTestId("carousel-slide 5");
        expect(slide2).toBeInTheDocument()

        await userEvent.click(buttonLeft[0])
    });
    
});
