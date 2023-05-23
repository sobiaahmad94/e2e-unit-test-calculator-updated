import React from 'react';
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
    container = render(<Calculator />);
  });


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
});

























//   // 2)

//   // 3)

//   // 4)

//   // 5)

//   // 6)

//   // 7)

//   // 1) calculator.add() - add 1 to 4 and get 5
//   // 2) calculator.subtract() subtract 4 from 7 and get 3
//   // 3) calculator.multiply() - multiply 3 by 5 and get 15
//   // 4) calculator.divide() - divide 21 by 7 and get 3
//   // 5) calculator.numberClick() - concatenate multiple number button clicks
//   // 6) calculator.operatorClick() - chain multiple operations together
//   // 7) calculator.clearClick() - clear the running total without affecting the calculation












