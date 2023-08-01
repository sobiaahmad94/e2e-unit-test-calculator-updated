import React from 'react';
import App from '/Users/sobiaahmad/codeclan_work/week_08/day_2/2_react_testing_lab/react_calculator/src/App.js';
import Calculator from './containers/Calculator';
import { render, fireEvent } from '@testing-library/react';

describe('App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it("Loads the app", () => {
        cy.get('h1').should('contain', '0');
    });
});