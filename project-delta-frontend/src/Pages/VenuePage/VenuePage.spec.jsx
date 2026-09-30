/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import VenuePage from '.';

const fetchMock = vi.spyOn(globalThis, "fetch")

describe("VenuePage page", () => {

    const mockResp = {
        name: "testVenue",
        amenities: ["Accessible entrance", "Accessible toilet"],
        formatted: "test address",
        website: "testsite.com"  
    }

    const renderPage = () => {
        render(
            <MemoryRouter initialEntries={["/1"]}>
                <Routes>
                    <Route path="/:id" element={<VenuePage />}/>
                </Routes>
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        fetchMock.mockImplementation(async () => 
            new Response(JSON.stringify(mockResp), { status: 200 })   
        )
    });

    afterEach(() => {
        vi.clearAllMocks()
        cleanup();
    });
    
    it("Displays the name and amenities of the venue", async () => {
        renderPage()
        expect(fetch).toHaveBeenCalled()

        const title = await screen.findAllByRole("heading");
        const amenities = await screen.findAllByTestId("amenity-icon")

        expect(title[0]).toBeInTheDocument();
        expect(title[0].innerHTML).toContain(`${mockResp.name}`)

        expect(amenities[0]).toBeInTheDocument()
        expect(amenities.length).toBe(2)
    });

    it("Allows to add and see reviews", async () => {
        renderPage()
        expect(fetch).toHaveBeenCalled()

        const see = await screen.findByText("See all reviews");
        const leave = await screen.findByText("Post a review");

        expect(see).toBeInTheDocument();
        expect(leave).toBeInTheDocument(); 
    });

    it("Allows to visit their website or get directions", async () => {
        renderPage()
        expect(fetch).toHaveBeenCalled()

        const title = await screen.findAllByRole("heading");

        expect(title[0]).toBeInTheDocument();
        expect(title[0].innerHTML).toContain(`${mockResp.name}`)
    });

    it("Displays a loading message if venue loading", async () => {
        renderPage()
        const loading = await screen.findByText("Loading venue...");

        expect(loading).toBeInTheDocument();
    });

    it("Displays an error if bad fetch response", async () => {
        fetchMock.mockImplementationOnce(async () => {
            new Response({ok: false, status: 404 })  
        })

        renderPage()

        const error = await screen.findByText("Failed to load venue details.");
        expect(error).toBeInTheDocument();
    });


    it("Show a loading page if no id in params", async () => {
        render(
            <VenuePage />   
        );

        const error = await screen.findByText("Loading venue...");
        expect(error).toBeInTheDocument();
    });


});
