/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import VenuePage from '.';

const fetchMock = vi.fn()
globalThis.fetch = fetchMock

describe("VenuePage page", () => {

    const mockResp = {
        features: {
            properties: {
                name: "testVenue",
                datasource: {
                    raw: {
                        amenity: "test amenity"
                    }
                },
                formatted: "test address",
                website: "testsite.com"
            }
        }
    }

    beforeEach(() => {
        fetchMock.mockClear()
        render(
        <BrowserRouter>
            <VenuePage />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Displays the name of the venue", async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => Promise.resolve(mockResp)
        })


        const title = screen.getByRole("heading");

        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toContain(`${mockResp.features.properties.name}`)
    });

    it("Displays a loading message if venue loading", async () => {
        const loading = await screen.findByText("Loading venue...");

        expect(loading).toBeInTheDocument();
    });


});
