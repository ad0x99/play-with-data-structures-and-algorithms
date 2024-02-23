// @ts-nocheck
// --- Directions
// Write a function that accepts an integer N
// and returns a NxN spiral matrix.
// --- Examples
//   matrix(2)
//     [[1, 2],
//     [4, 3]]
//   matrix(3)
//     [[1, 2, 3],
//     [8, 9, 4],
//     [7, 6, 5]]
//  matrix(4)
//     [[1,   2,  3, 4],
//     [12, 13, 14, 5],
//     [11, 16, 15, 6],
//     [10,  9,  8, 7]]

// Solution 1
/**
 * We start from the top left corner and move right, then move down, then move left, then move up, and
 * repeat until we've filled the entire matrix
 * @param n - the number of rows and columns in the matrix
 * @returns A matrix of numbers in a spiral pattern.
 */
const matrix = (n) => {
  const result = [];
  let startColumn = 0;
  let endColumn = n - 1;
  let startRow = 0;
  let endRow = n - 1;
  let counter = 1;
  let i;

  for (i = 0; i < n; i++) {
    result.push([]);
  }

  while (startColumn <= endColumn && startRow <= endRow) {
    // Top row
    for (i = startColumn; i <= endColumn; i++) {
      result[startRow][i] = counter;
      counter++;
    }
    startRow++;

    // Right column
    for (i = startRow; i <= endRow; i++) {
      result[i][endColumn] = counter;
      counter++;
    }
    endColumn--;

    // Bottom row
    for (i = endColumn; i >= startColumn; i--) {
      result[endRow][i] = counter;
      counter++;
    }
    endRow--;

    // Start column
    for (i = endRow; i >= startRow; i--) {
      result[i][startColumn] = counter;
      counter++;
    }
    startColumn++;
  }

  return result;
};

export default matrix;
