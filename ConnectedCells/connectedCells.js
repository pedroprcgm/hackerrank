'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

const readLine = () => {
    return inputString[currentLine++];
}

const isFilled = value => value === 1;

var nav = 0;
var max = 0;

/**
 * @desc Control the navigation
 * On connectedCell fn, each time that restart navigation navigation size will be 0
 * ever that navigate to an item navigation will increment
 * here we check if the current navigation is better than any other and save it on max variable.
 */
const countRegion = () => {
    nav++;
    max = nav > max ? nav : max;
};

const connectedCell = matrix => {

    matrix = matrix.map(row => {
        return row.map(col => {
            return {
                filled: isFilled(col),
                visited: false,
                value: col
            };
        });
    });

    matrix.forEach((row, rowNumber) => {
        row.forEach((col, colNumber) => {        
            if (mustEnter(col)) {
                enterItem(rowNumber, colNumber, matrix);
                nav = 0;
            }
        });
    });

    return max;
};

/**
 * 
 * @param {Object: {filled: boolean, visited: boolean}} item 
 * @desc Check if we can enter in this item.
 * 
 */
const mustEnter = item => item && item.filled && !item.visited;

/**
 * 
 * @param {int} row 
 * @param {int} col 
 * @param {Array} arr 
 */
const checkRow = (row, col, arr) => {

    // item
    if (mustEnter(arr[row][col])) { 
        enterItem(row, col, arr);
    }

    // left column
    if (mustEnter(arr[row][col - 1])) { 
        enterItem(row, col - 1, arr);
    }

    // right column
    if (mustEnter(arr[row][col + 1])) { 
        enterItem(row, col + 1, arr);
    }          
};

/**
 * 
 * @param {Object} item 
 * @param {int} row 
 * @param {int} col 
 * @param {Array} arr 
 * @desc Enter at item and look around it.
 */
const enterItem = (row, col, arr) => {
    let item = arr[row][col];

    item.visited = true;

    countRegion();

    checkRow(row, col, arr);

    // previous row
    if(row > 0) { 
        var previousRow = row - 1;
        checkRow(previousRow, col, arr);       
    }

    // next row
    if (row < arr.length - 1) { 
        let nextRow = row + 1;
        checkRow(nextRow, col, arr);
    }    
};

const main = () => {

    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const m = parseInt(readLine(), 10);

    let matrix = Array(n);

    for (let i = 0; i < n; i++) {
        matrix[i] = readLine().split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    let result = connectedCell(matrix);
    
    ws.write(result + "\n");

    ws.end();
};
