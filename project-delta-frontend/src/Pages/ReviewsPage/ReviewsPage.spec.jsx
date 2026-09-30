/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers)

import ReviewsPage from ".";
const fetchMock = vi.spyOn(globalThis, "fetch")

describe("ReviewsPage page", () => {

    const renderPage = () => {
        render(
            <MemoryRouter initialEntries={["/1"]}>
                <Routes>
                    <Route path="/:id" element={<ReviewsPage />}/>
                </Routes>
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        fetchMock.mockImplementation(async () => 
            new Response({ok: true, status: 201 })   
        )
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks()
    });
    
    it("Displays a title", async () => {
        renderPage()
        const title = await screen.findByRole("heading");

        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toContain("Reviews");
    });

});