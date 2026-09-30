/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import PlaceList from '.';
import { PlacesContext } from '../../context/PlacesContext';


describe("PlaceList component", () => {

    const places = [{
            id: 1,
            name: "place1",
            lat: 51.8099,
            lng: -0.2238,
            category: [],
            amenities: [],
            }]
    const placesByCategory =  {
            cafe: [],
            restaurant: [],
            museum: [],
            playground: []
        }      
    const userLocation =  {lat: 51.8098, lng:-0.2237}
    const isLoading = false
    const error = ""

    const renderPage = ((changes = {}) => {
        const defaults = {places, placesByCategory, userLocation, isLoading, error}
        const changed = {...defaults, ...changes}
        render(
            <BrowserRouter>
                <PlacesContext.Provider value={changed}>
                    <PlaceList />
                </PlacesContext.Provider>
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
    
    it("Displays a list containing places", () => {
        renderPage()
        const list = screen.getByTestId("list");
        expect(list).toBeInTheDocument()

        
    });

    //mock places to pass to the list
    
});
