/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import VenuePage from '.';

// const fetchMock = vi.fn()
// globalThis.fetch = fetchMock

describe("VenuePage page", () => {

    const mockResp = {
        name: "testVenue",
        datasource: {
            raw: {
                amenity: "test amenity"
            }
        },
        formatted: "test address",
        website: "testsite.com"  
    }

    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn(() => 
            Promise.resolve(
                new Response(JSON.stringify(mockResp), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
            }))
        ));
        render(
            <MemoryRouter initialEntries={["/1"]}>
                <Routes>
                    <Route path="/:id" element={<VenuePage />}/>
                </Routes>
            </MemoryRouter>
        );
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Displays the name of the venue", async () => {
        expect(fetch).toHaveBeenCalled()

        const title = await screen.findAllByRole("heading");

        expect(title[0]).toBeInTheDocument();
        expect(title[0].innerHTML).toContain(`${mockResp.name}`)
    });

    it("Displays a loading message if venue loading", async () => {
        const loading = await screen.findByText("Loading venue...");

        expect(loading).toBeInTheDocument();
    });


});
