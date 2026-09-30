/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import Map from '.';
import { PlacesContext } from '../../context/PlacesContext';

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map">{children}</div>,
  TileLayer: () => null,
  Marker: ({ children }) => <div>{children}</div>,
  Popup: ({ children }) => <div>{children}</div>,
}));

describe("Map component", () => {
    
    const places = [{
            id: 1,
            name: "place1",
            lat: 51.8099,
            lng: -0.2238,
            category: [],
            amenities: [],
            }]
    const placesByCategory=  {
            cafe: [],
            restaurant: [],
            museum: [],
            playground: []
        }       
    const userLocation =  {lat: 51.8098, lng:-0.2237}
    const isLoading = false
    const error = ""
    

    const renderPage = (changes = {}) => {
        const defaults = {places, placesByCategory, userLocation, isLoading, error}
        const changed = {...defaults, ...changes}
        render(
            <BrowserRouter>
                <PlacesContext.Provider value={changed}>
                    <Map />
                </PlacesContext.Provider>
            </BrowserRouter>);
    }

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it("Notifies you that it's finding your location", async () => {
        renderPage({ isLoading: true })
        const loading = await screen.findByText("Finding your location...");

        expect(loading).toBeInTheDocument()
    });

    it("Displays the map once it's loaded", async () => {
        renderPage()
        const map = await screen.findByTestId("map");

        expect(map).toBeInTheDocument()
    });

    it("Has pins that link to the correct venue page", async () => {
        renderPage({ isLoading: false });
        const venueLink = screen.getByRole('link', { name: "place1" });

        expect(venueLink).toBeInTheDocument();
        expect(venueLink).toHaveAttribute("href", "/venue/1");
    });

    it("Displays an error message if an error occurs", async () => {
        renderPage({ error: "Failed to fetch locations" });
        expect(screen.getByText("Failed to fetch locations")).toBeInTheDocument();
    });
    
});
