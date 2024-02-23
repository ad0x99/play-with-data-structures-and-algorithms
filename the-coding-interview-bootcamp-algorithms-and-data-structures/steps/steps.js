// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a step shape
// with N levels using the # character.  Make sure the
// step has spaces on the right hand side!
// --- Examples
//   steps(2)
//       '# '
//       '##'
//   steps(3)
//       '#  '
//       '## '
//       '###'
//   steps(4)
//       '#   '
//       '##  '
//       '### '
//       '####'

// Solution 1
/**
 * For each row, create a string of '#' characters up to and including the current row, and then pad
 * the rest of the string with spaces
 * @param n - the number of steps
 */
const steps = (n) => {
  for (let row = 0; row < n; row++) {
    let stair = '';

    for (let col = 0; col < n; col++) {
      if (col <= row) {
        stair += '#';
      } else {
        stair += ' ';
      }
    }

    console.log(stair);
  }
};

// Solution 2
/**
 * If the number of rows is equal to the number of steps, return. If the number of steps is equal to
 * the length of the stair string, print the stair string and return the function with the row
 * incremented by 1. If the length of the stair string is less than or equal to the row, add a '#' to
 * the stair string. Otherwise, add a space to the stair string
 * @param n - the number of steps
 * @param [row=0] - the current row we're working on
 * @param [stair] - the current string we're working on
 * @returns The function is being called recursively until the base case is met.
 */
const steps2 = (n, row = 0, stair = '') => {
  if (n === row) {
    return;
  }

  if (n === stair.length) {
    console.log(stair);
    return steps2(n, row + 1);
  }

  if (stair.length <= row) {
    stair += '#';
  } else {
    stair += ' ';
  }

  steps2(n, row, stair);
};

export { steps };
