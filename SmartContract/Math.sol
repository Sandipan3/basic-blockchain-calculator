// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

contract Math{
    //plan -> store the last result that will change its state 

    int public lastResult;
    address public owner;
    //constructor to initialise the one who will pay

    constructor() payable {
        owner = msg.sender;
    }

    event Calculate( string operator , int a , int b , int result);

    function add(int a , int b) public returns (int){
        // calculate result 
        int result = a +b;
        //change state 
        lastResult = result;
        //emit 
        emit Calculate("add", a, b, result);
        //return result
        return result;
    }

    function subtract(int a , int b) public returns (int){
        // calculate result 
        int result = a - b;
        //change state 
        lastResult = result;
        //emit 
        emit Calculate("subtract", a, b, result);
        //return result
        return result;
    }

    function multiply(int a , int b) public returns (int){
        // calculate result 
        int result = a * b;
        //change state 
        lastResult = result;
        //emit 
        emit Calculate("multiply", a, b, result);
        //return result
        return result;
    }

    function divide(int a , int b) public returns (int){
        //ensure b is not 0
        require(b != 0 , "Division by zero");

        //scale numerator to preserve decimals (like 18 decimal places) 
        int result = (a * 1e18 )/ b;
        //change state 
        lastResult = result;
        //emit 
        emit Calculate("divide", a, b, result);
        //return result
        return result;
    }

    function getLastState() public  view returns (int){
        return lastResult;
    }
}