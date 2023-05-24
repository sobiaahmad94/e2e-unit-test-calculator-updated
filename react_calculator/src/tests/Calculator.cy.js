import React, { useState } from 'react';
import Calculator from '../containers/Calculator';
import KeyPad from '../components/KeyPad';
import { render, fireEvent } from '@testing-library/react';


// WEE NOTES:
// ids need to be put in like: data-testid="number7"
// I've checked the KeyPad and Calculator components
// ids have been given to the number buttons like number1 etc in the KeyPad component
// ids have been given to operators too like operator-add, again in KeyPad 
// basically the KeyPad component has all of the buttons on the calculator for the numbers and symbols and that
// the Calculator component just has the running-total id

// fireEvent = lets you trigger an event on a HTML tag later
// waitFor allows you to wait for changes 

// describe is a function that's built into the testing lib 
// describe lets you label the component name so Calculator is labelled here
// then there's an arrow function
describe('Calculator', () => {

  let container;
  // the container variable here to store a version of Calculator in the test
  // its just easier to access it by using container as a variable to reference the calculator
  // this is just creating the variable


  // I think beforeEach is kinda like when we used setUp in Python
  // I think beforeEach makes it that it's rendered every time I try to check for a wee test just so it's ready but not 100%
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    container = render(<Calculator />);
  });

  ///////// UNIT TESTING USING THE REACT TESTING LIBRARY

  // A) I think this one just checks that if a number is select (e.g. 4) then the running-total updates
  it('should change running total on number enter', () => {
    const button4 = container.getByTestId('number4');
    const runningTotal = container.getByTestId('running-total');

    fireEvent.click(button4);
    expect(runningTotal.textContent).toEqual('4');
  });

  // 1) add 1 to 4 and get 5
  it('should add 1 and 4 to result in 5', () => {
    const button1 = container.getByTestId('number1');
    const button4 = container.getByTestId('number4');
    // grabbing the ids from KeyPad (Calculator for running-total)
    const operatorAdd = container.getByTestId('operator-add');
    const operatorEquals = container.getByTestId('operator-equals');
    const runningTotal = container.getByTestId('running-total');

    fireEvent.click(button1);
    fireEvent.click(operatorAdd);
    fireEvent.click(button4);
    fireEvent.click(operatorEquals);
    // textContent is a JS thing which is just what's inside of a tag
    expect(runningTotal.textContent).toEqual('5');
  });


  // 2) subtract 4 from 7 and get 3
  it('should subtract 4 from 7 to get 3', () => {
    const button7 = container.getByTestId('number7');
    const button4 = container.getByTestId('number4');
    const operatorSubtract = container.getByTestId('operator-subtract');
    const operatorEquals = container.getByTestId('operator-equals');
    const runningTotal = container.getByTestId('running-total');

    fireEvent.click(button7);
    fireEvent.click(operatorSubtract);
    fireEvent.click(button4);
    fireEvent.click(operatorEquals);
    expect(runningTotal.textContent).toEqual('3');
  });


  // 3) multiply 3 by 5 and get 15
  it('should multiply 3 by 5 to get 15', () => {
    const button3 = container.getByTestId('number3');
    const button5 = container.getByTestId('number5');
    const operatorMultiply = container.getByTestId('operator-multiply');
    const operatorEquals = container.getByTestId('operator-equals');
    const runningTotal = container.getByTestId('running-total');

    fireEvent.click(button3);
    fireEvent.click(operatorMultiply)
    fireEvent.click(button5);
    fireEvent.click(operatorEquals);
    expect(runningTotal.textContent).toEqual('15');
  });

  // 4) divide 21 by 7 and get 3
  it('should divide 21 by 7 and get 3', () => {
    // get 2 and 1
    // create a button21 variable and convert button1 and button2 into strings
    const button2 = container.getByTestId('number2');
    const button1 = container.getByTestId('number1')
    // const button21 = str(button1) + str(button2)
    const operatorDivide = container.getByTestId('operator-divide');
    const button7 = container.getByTestId('number7');
    const operatorEquals = container.getByTestId('operator-equals');
    const runningTotal = container.getByTestId('running-total');

    fireEvent.click(button2);
    fireEvent.click(button1);
    fireEvent.click(operatorDivide);
    fireEvent.click(button7);
    fireEvent.click(operatorEquals);
    expect(runningTotal.textContent).toEqual('3');
  });

  // 5) concatenate (merge) multiple number button clicks (3 and 4 should be 34 and not 7 lol, kinda like I was thinking for the one above as I converted then to strings)
  // 34 (clicking 3 and 4)
  // if statement if 3 and 4 are clicked right after each other store it as 34
  // actually might be an easier way as if they click two numbers then they should be concatenated
  it('should concatenate multiple numbers together when they are clicked', () => {
    const button3 = container.getByTestId('number3');
    const button4 = container.getByTestId('number4');
    // const button34 = str(button3) + str(button4);
    const runningTotal = container.getByTestId('running-total');

    fireEvent.click(button3);
    fireEvent.click(button4);
    expect(runningTotal.textContent).toEqual('34');
  });

  // 6) chain multiple operations together
  // got stuck on this one *****
  // it's cool, got it working, just created a wee version then went back to this and it worked :) 
  // use 5 * 7 - 3 / 9 + 2 = whatever (BODMAS hahaha, division first)
  it('should be able to chain multiple operators together', () => {
    const button5 = container.getByTestId('number5');
    const operatorMultiply = container.getByTestId('operator-multiply');
    const button7 = container.getByTestId('number7');
    const operatorSubtract = container.getByTestId('operator-subtract');
    const button3 = container.getByTestId('number3');
    const operatorDivide = container.getByTestId('operator-divide');
    const button9 = container.getByTestId('number9');
    const operatorAdd = container.getByTestId('operator-add');
    const button2 = container.getByTestId('number2')
    const operatorEquals = container.getByTestId('operator-equals');
    const runningTotal = container.getByTestId('running-total');

    fireEvent.click(button5);
    fireEvent.click(operatorMultiply);
    fireEvent.click(button7);
    fireEvent.click(operatorSubtract);
    fireEvent.click(button3);
    fireEvent.click(operatorDivide);
    fireEvent.click(button9);
    fireEvent.click(operatorAdd);
    fireEvent.click(button2);
    fireEvent.click(operatorEquals);
    fireEvent.click(runningTotal);
    expect(runningTotal.textContent).toEqual('5.555555555555555');

  });

  // second example :D
  // I'll try a more basic version of this
  // 7 + 1 - 2

  // it('should be able to chain multiple operators together', () => {
  //   const button7 = container.getByTestId('number7');
  //   const operatorAdd = container.getByTestId('operator-add');
  //   const button1 = container.getByTestId('number1');
  //   const operatorSubtract = container.getByTestId('operator-subtract');
  //   const button2 = container.getByTestId('number2');
  //   const runningTotal = container.getByTestId('running-total');

  //   fireEvent.click(button7);
  //   fireEvent.click(operatorAdd);
  //   fireEvent.click(button1);
  //   fireEvent.click(operatorSubtract);
  //   fireEvent.click(button2);
  //   fireEvent.click(runningTotal);
  //   expect(runningTotal.textContent).toEqual('2');
  // });

  // 7) clear the running total without affecting the calculation
  // maybe I could do 1 + 2 = 3 so can check that and then set it to 0 
  // omg actually could use useState for this
  // STUCK ON THISSSS :S will ask tomorrow.
  it('should be able to clear the running total without affecting the calculation', () => {

    // useState (total is set to 0)
    const [total, setTotal] = useState(0)

    const button1 = container.getByTestId('number1');
    const operatorAdd = container.getByTestId('operator-add');
    const button2 = container.getByTestId('number2');
    const operatorEquals = container.getByTestId('operator-equals');
    const button3 = container.getByTestId('number3');
    const runningTotal = container.getByTestId('running-total');



    fireEvent.click(button1);
    fireEvent.click(operatorAdd);
    fireEvent.click(button2);
    fireEvent.click(operatorEquals);
    fireEvent.click(button3);
    fireEvent.click(runningTotal);

    setTotal((runningTotal.textContent))
    expect(runningTotal.textContent).toEqual('0');

  });



  // unit tests I wanna do:
  // 1) calculator.add() - add 1 to 4 and get 5 [done]
  // 2) calculator.subtract() subtract 4 from 7 and get 3 [done]
  // 3) calculator.multiply() - multiply 3 by 5 and get 15 [doneee]
  // 4) calculator.divide() - divide 21 by 7 and get 3 [doneeeeeee]
  // 5) calculator.numberClick() - concatenate multiple number button clicks [doneeeee]
  // 6) calculator.operatorClick() - chain multiple operations together [done x2]:)
  // 7) calculator.clearClick() - clear the running total without affecting the calculation


  ///////// e2e TESTING USING CYPRESS:

  // e2e tests I wanna do:
  // 1) Do the number buttons update the display of the running total? [doneee]
  // 2) Do the arithmetical operations update the display with the result of the operation? [doneeee]
  // E.g. does 2 + 2 - update the display to 4
  // 3) Can multiple operations be chained together? [done]
  // E.g. does 3 + 1 - 2 == 2
  // 4) Is the output as expected for positive numbers [done]
  // 5) Is the output as expected for negative numbers [omg so similar to the previous one haha] [done]
  // 6) Is the output as expected for decimal numbers [done]
  // 7) Is the output as expected for very large numbers [doneeee]
  // 8) What does the code do in exceptional circumstances? Specifically, if you divide by zero, what is the effect? Write a test to describe what you'd prefer to happen, and then correct the code to make that test pass (you will need to modify the Calculator model to meet this requirement).

  // SOME NOTES:
  // cy.get is like grabbing an element I think (similar to querySelector)
  // instead of number1, number2 etc as the ids like in unit testing
  // have to grab the full thing like data-testid="number1"
  // .click can be used as a click event similar to before
  // .should is the equivalent to expected
  // have.text is mentioned here in the cypress documentation: example was this - .should('have.text', 'I love testing')


  // 1) Do the number buttons update the display of the running total?
  it('Should update the display of the running total', () => {
  
    // click events on the numbers
    cy.get('[data-testid="number1"]').click();
    cy.get('[data-testid="number7"]').click();
    cy.get('[data-testid="number2"]').click();
    cy.get('[data-testid="number4"]').click();
    cy.get('[data-testid="number3"]').click();
    cy.get('[data-testid="number0"]').click();
    cy.get('[data-testid="number8"]').click();

    // should is basically like expected I think 
    // have.text needs to be used
    cy.get('[data-testid="running-total"]').should('have.text', '1724308');
  });

    // 2) Do the arithmetical operations update the display with the result of the operation?
    // should be something like 3 - 2 
    it('Should update the display when clicking arithmetical operations when entering sums', () => {
  
      // click events on the button ids on the calc
      cy.get('[data-testid="number3"]').click();
      cy.get('[data-testid="operator-subtract"]').click();
      cy.get('[data-testid="number1"]').click();
      cy.get('[data-testid="equals-operator"]').click();
      
      // should = expected
      // have.text again:)
      cy.get('[data-testid="running-total"]').should('have.text', '2');
    });

      // 3) Can multiple operations be chained together?
      // could be something like 4 + 1 - 2 == 3

      it('Should be able to let you chain multiple arithmetic operators together', () => {
  
        // click events on the button ids on the calc
        cy.get('[data-testid="number4"]').click();
        cy.get('[data-testid="operator-add"]').click();
        cy.get('[data-testid="number1"]').click();
        cy.get('[data-testid="operator-subtract"]').click();
        cy.get('[data-testid="number2"]').click();
        cy.get('[data-testid="equals-operator"]').click();


        // should = expected
        // have.text again:)
        cy.get('[data-testid="running-total"]').should('have.text', '3');
      });

        // 4) Is the output as expected for positive numbers?
        // 8 + 9 + 3 + 1 + 7 = 28 (positive number result)
        it('Should output positive numbers when the total is a positive number when there is a sum calculated', () => {
          cy.get('[data-testid="number8"]').click();
          cy.get('[data-testid="operator-add"]').click();
          cy.get('[data-testid="number9"]').click();
          cy.get('[data-testid="operator-add"]').click();
          cy.get('[data-testid="number3"]').click();
          cy.get('[data-testid="operator-add"]').click();
          cy.get('[data-testid="number1"]').click();
          cy.get('[data-testid="operator-add"]').click();
          cy.get('[data-testid="number7"]').click();
          cy.get('[data-testid="equals-operator"]').click();


          // should = expected
          // have.text
          cy.get('[data-testid="running-total"]').should('have.text', '28');
        });

        // 5) Is the output as expected for negative numbers
        // 1003 - 3031 (negative number result)
        it('Should output negative numbers when the total is a positive number when there is a sum calculated', () => {
          cy.get('[data-testid="number1"]').click();
          cy.get('[data-testid="number0"]').click();
          cy.get('[data-testid="number0"]').click();
          cy.get('[data-testid="number3"]').click();
          cy.get('[data-testid="operator-subtract"]').click();
          cy.get('[data-testid="number3"]').click();
          cy.get('[data-testid="number0"]').click();
          cy.get('[data-testid="number3"]').click();
          cy.get('[data-testid="number1"]').click();
          cy.get('[data-testid="equals-operator"]').click();

          // should = expected
          // have.text
          cy.get('[data-testid="running-total"]').should('have.text', '-2028');
        });

          // 6) Is the output as expected for decimal numbers
          // could do 5.7 + 9.6 = 15.3
          it('Should output decimal/floating point numbers', () => {
            cy.get('[data-testid="number5"]').click();
            cy.get('[data-testid="decimal"]').click();
            cy.get('[data-testid="number7"]').click();
            cy.get('[data-testid="operator-add"]').click();
            cy.get('[data-testid="number9"]').click();
            cy.get('[data-testid="decimal"]').click();
            cy.get('[data-testid="number6"]').click();
            cy.get('[data-testid="equals-operator"]').click();

            // should = expected
          // have.text
          cy.get('[data-testid="running-total"]').should('have.text', '15.3');

          });

          // 7) Is the output as expected for very large numbers
          // here's a large number 1399011987235725
          it('Should be able to output very large numbers', () => {
            cy.get('[data-testid="number1"]').click();
            cy.get('[data-testid="number3"]').click();
            cy.get('[data-testid="number9"]').click();
            cy.get('[data-testid="number9"]').click();
            cy.get('[data-testid="number0"]').click();
            cy.get('[data-testid="number1"]').click();
            cy.get('[data-testid="number1"]').click();
            cy.get('[data-testid="number9"]').click();
            cy.get('[data-testid="number8"]').click();
            cy.get('[data-testid="number7"]').click();
            cy.get('[data-testid="number2"]').click();
            cy.get('[data-testid="number3"]').click();
            cy.get('[data-testid="number5"]').click();
            cy.get('[data-testid="number7"]').click();
            cy.get('[data-testid="number2"]').click();
            cy.get('[data-testid="number5"]').click();
            cy.get('[data-testid="equals-operator"]').click();

            // should = expected
            // have.text
            cy.get('[data-testid="running-total"]').should('have.text', '1399011987235725');

          });

            // 8) What does the code do in exceptional circumstances? Specifically, if you divide by zero, what is the effect? Write a test to describe what you'd prefer to happen, and then correct the code to make that test pass (you will need to modify the Calculator model to meet this requirement).
            // I'll write the test but will change the Calculator component later
            // 4 / 0 is a basic one
          it('Should be able to divide by 0 so that the user can get the full calculator experience haha', () => {
            cy.get('[data-testid="number4"]').click();
            cy.get('[data-testid="operator-divide"]').click();
            cy.get('[data-testid="number0"]').click();
            cy.get('[data-testid="equals-operator"]').click();

            // should = expected
            // have.text
            cy.get('[data-testid="running-total"]').should('have.text', `Soz pal, you can't divide by 0 right now. What a class calaculator, eh? ;) Hopefully will get that sorted for you soon...`);

          });
          








});










