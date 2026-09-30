/* eslint-env jest */
import { describe, it, expect, beforeEach, beforeAll, afterEach, vi } from "vitest";
import { screen, render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers)

import ReviewForm from ".";
let originalStorage
const fetchMock = vi.spyOn(globalThis, "fetch")

vi.mock(import("react-router-dom"), async (importOriginal) => {
    const actual = await importOriginal()
    return{
        ...actual,
        useNavigate: vi.fn()
    }
})

describe("ReviewForm page", () => {

    const renderPage = () => {
        render(
            <MemoryRouter initialEntries={["/1"]}>
                <Routes>
                    <Route path="/:id" element={<ReviewForm />}/>
                </Routes>
            </MemoryRouter>
        );
    }

    beforeAll(() => {
        originalStorage = window.localStorage;
        window.localStorage = {
            store: {
                userId: 1,
                token: "becusbc78eg8g38"
            },
            getItem(key) {
            return this.store[key] ?? null;
            },
            setItem(key, value) {
            this.store[key] = value;
            },
            removeItem(key) {
            delete this.store[key];
            },
            clear() {
            this.store = {};
            },
        };
    })

    beforeEach(() => {
        fetchMock.mockImplementation(async () => 
            new Response({ok: true, status: 201 })   
        )
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks()
    });
    
    it("Displays the correct title if logged in", () => {
        renderPage()
        const title = screen.getByRole("heading");

        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toContain("Leave a review")
    });

    it("Displays a form to fill out for the review and allows it to be submitted", async () => {
        renderPage()
        const form = screen.getByTestId("form")

        expect(form).toBeInTheDocument();
        expect(form.children.length).toBe(9)

        userEvent.click(form.children[1].children[1])
        userEvent.click(form.children[3].children[1])
        userEvent.click(form.children[5].children[1])
        fireEvent.change(form.children[7], { target: { value: "review" } });
        userEvent.click(form.children[8])
        
        //expect(fetchMock).toHaveBeenCalled()
        expect(useNavigate).toHaveBeenCalled()
    });

    it("Doesn't submit the form if left blank", async () => {
        renderPage()
        const form = screen.getByTestId("form")

        expect(form).toBeInTheDocument();
        expect(form.children.length).toBe(9)

        userEvent.click(form.children[8])
        
        const error = await screen.findByText("Please select a rating.")
        expect(error).toBeInTheDocument()

    });

    it("Displays the correct title if not logged in", () => {
        localStorage.clear()
        renderPage()
        const title = screen.getByRole("heading");

        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toContain("You need an account to leave a review")
    });

});