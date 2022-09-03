// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a pyramid shape
// with N levels using the # character.  Make sure the
// pyramid has spaces on both the left *and* right hand sides
// --- Examples
//   pyramid(1)
//       '#'
//   pyramid(2)
//       ' # '
//       '###'
//   pyramid(3)
//       '  #  '
//       ' ### '
//       '#####'

// Solution 1
/**
 * For each row, if the column is within the range of the pyramid, add a #, otherwise add a space
 * @param n - the number of rows in the pyramid
 */
const pyramid1 = (n) => {
  const midpoint = Math.floor((2 * n - 1) / 2);

  for (let row = 0; row < n; row++) {
    let level = '';

    for (let col = 0; col < 2 * n - 1; col++) {
      if (midpoint - row <= col && midpoint + row >= col) {
        level += '#';
      } else {
        level += ' ';
      }
    }

    console.log(level);
  }
};

// Solution 2
/**
 * If the length of the level string is equal to the number of columns, print the level string and
 * return the function. If the length of the level string is less than the number of columns, add a
 * space or a # to the level string and return the function
 * @param n - the number of rows in the pyramid
 * @param [row=0] - the current row we're working on
 * @param [level] - the current level of the pyramid
 * @returns The function is being returned.
 */
const pyramid = (n, row = 0, level = '') => {
  const midpoint = Math.floor((2 * n - 1) / 2);
  let add = '';

  if (row === n) {
    return;
  }

  if (level.length === 2 * n - 1) {
    console.log(level);
    return pyramid(n, row + 1);
  }

  if (midpoint - row <= level.length && midpoint + row >= level.length) {
    add += '#';
  } else {
    add += ' ';
  }

  return pyramid(n, row, level + add);
};

module.exports = pyramid;
