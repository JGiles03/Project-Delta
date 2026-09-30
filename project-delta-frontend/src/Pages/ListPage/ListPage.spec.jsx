/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { Placesprovider } from '../../context/PlacesContext';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import ListPage from '.';


describe("ListPage page", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
        <Placesprovider>
             <ListPage />
        </Placesprovider>
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("exists and has 2 child elements", () => {
        const list = screen.getByTestId("list-page");

        expect(list).toBeInTheDocument();
        expect(list.childNodes.length).toBe(2)
    });

});
