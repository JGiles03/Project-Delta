/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers)

import ReviewsPage from ".";

describe("ReviewsPage page", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
            <ReviewsPage />
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });
    
    it("Displays a title", () => {
        // const title = screen.getByRole("heading");

        // expect(title).toBeInTheDocument();
    });

});