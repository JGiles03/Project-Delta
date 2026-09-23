/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)

import PlaceList from '.';
import { Placesprovider } from '../../context/PlacesContext';


describe("PlaceList component", () => {

    beforeEach(() => {
        render(
        <BrowserRouter>
        <Placesprovider>
            <PlaceList />
        </Placesprovider>
        </BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Displays a list containing places", () => {
        
        const list = screen.getByTestId("list");

        if(list){
            expect(list).toBeInTheDocument()
        } else {
            const error = screen.getByTestId("list-message");
            expect(error).toBeInTheDocument()
        }

        
    });

    //mock places to pass to the list
    
});
