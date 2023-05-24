import React, {useState} from 'react';
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
  it('should concatenate multiple numbers together when they are clicked', () =>{
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





});



















// Tests I wanna do:
  // 1) calculator.add() - add 1 to 4 and get 5 [done]
  // 2) calculator.subtract() subtract 4 from 7 and get 3 [done]
  // 3) calculator.multiply() - multiply 3 by 5 and get 15 [doneee]
  // 4) calculator.divide() - divide 21 by 7 and get 3 [doneeeeeee]
  // 5) calculator.numberClick() - concatenate multiple number button clicks [doneeeee]
  // 6) calculator.operatorClick() - chain multiple operations together [done x2]:)
  // 7) calculator.clearClick() - clear the running total without affecting the calculation












