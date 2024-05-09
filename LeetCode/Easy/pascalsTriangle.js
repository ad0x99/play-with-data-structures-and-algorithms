/**
 * https://leetcode.com/problems/pascals-triangle/
 *
 * Brute Force Approach
 *
 * 1. First row is always [1], we add the base case to the triangle.
 * 2. The first row is already added to the triangle, then we don't need to visit it again, we just need to iterate through the remaining rows which start from 1.
 * 3. We use prevRow to reference to the previous row, and because the first element is always 1, we initialize first element as 1 for the newRow array.
 * 4. As long as `col < row,` we calculate the inner elements.
 * 5. We calculate the sum of adjacent elements as `currentSum = prevElement + currentElement`, then we push the current sum to `newRow` array
 * 6. Out of inner loop, because the last element is always 1, we push the last element as 1 and we push new row to the final triangle
 *
 * Time complexity: O(n^2) - where n is the number of rows, because we have nested loops where the outer loop runs numRows times and the inner loop runs i times for each iteration of the outer loop.
 *
 * Space complexity is O(n^2) as well because we are storing the entire Pascal's triangle in a 2D array of size numRows x numRows. Each row contains i elements where i ranges from 1 to numRows, so the total number of elements in the triangle is roughly numRows^2.
 */
const generate = (numRows) => {
  // First row is always [1], we add the base case to the triangle
  const triangle = [[1]];

  // The first row is already added to the triangle
  // Then we don't need to visit it again
  // We just need to iterate through the remaining rows which start from 1
  for (let row = 1; row < numRows; row++) {
    // Get previous row
    let prevRow = triangle[row - 1];
    // Because the first element is always 1, we initialize first element as 1
    let newRow = [1];

    // As long as row < col, we calculate the inner elements
    for (let col = 1; col < row; col++) {
      // Calculate the sum of adjacent elements as currentSum = prevEl + currentEl
      // Then we push the current sum to newRow array
      newRow.push(prevRow[col - 1] + prevRow[col]);
    }

    // Because the last element is always 1, we push the last element as 1
    newRow.push(1);
    // And then we push new row to the final triangle
    triangle.push(newRow);
  }

  return triangle;
};

/**
 * Recursion Approach
 *
 * The idea is that we will call a recursive function to calculate the sum for each (row,col).
 *
 * 1. The base case: If the first two rows, or the leftmost element in any row, or diagonal elements), the value is simply 1. These are the starting points for building the triangle.
 *
 * 2. Recurrence Relation: If none of the base cases apply, we calculate the value using a recursive formula. This formula states that the value at a specific row (row) and column (col) in Pascal's Triangle is the sum of the values at:
 * - 2.1: The element in the previous row (row - 1) and the same column (col).
 * - 2.2: The element in the previous row (row - 1) and one less column (col - 1).
 * - 2.3: The function performs these recursive calls to recursion with the adjusted row and column values and adds the returned results.
 *
 * 3. Outside the recursion function, we create an array named `ans` with a length of numRows to store the Pascal's Triangle.
 * - 3.1: We create an array with numRows empty sub-arrays. These sub-arrays will eventually hold the elements for each row of the triangle.
 *
 * 4. Two nested loops iterate through the rows and columns of the desired Pascal's Triangle:
 * - 4.1: The outer loop iterates from `row = 0` to `row < numRows`, representing each row in the triangle.
 * - 4.2: The inner loop iterates from `col = 0 `to `col < row + 1`, representing the elements within each row. (Since Pascal's Triangle has a specific shape, the number of elements in each row increases by 1).
 * - 4.3: Inside the nested loops, the recursion function is called with the current `row` and `col` values.The returned value from recursion (which represents the element's value at that specific row and column) is then pushed into the corresponding sub-array (ans[row]) of the ans array.
 *
 * 5. We return the ans after iterating all the rows and columns.
 *
 * Optimization: To calculate the current row and column, we have to calculate the previous row and column. To be able to reduce the calculation time, we will create a cache to store the calculated row and column, and then we just need to use existing result in the cache instead of re-calculate it.
 *
 * 1. Inside the recursion function, we create `memo` map for memoization, which stores previously calculated values to avoid redundant calculations.
 * 2. Inside recursion: we create a unique key by combining row and col into a string separated by a comma. This key will be used to identify unique combinations of row and column in the memo object.
 * 3. We first check if current combination is already existed in the memo, it means the value has been calculated before, we return the calculated result.
 * 4. Before returning the calculated value (result), we store the current result in the memo map. It can be retrieved efficiently from the memo instead of re-calculating it in the later loop.
 *
 * Time complexity: O(n^2 * 2^n) - where n is the number of the rows
 *
 * Space complexity: O(n)
 *
 */
const generate = (numRows) => {
  let memo = new Map();

  const recursion = (row, col) => {
    const key = `${row},${col}`;
    if (memo.has(key)) {
      return memo.get(key);
    }

    // Base case
    if (row === 0 || row === 1 || col === 0 || row === col) {
      return 1;
    }
    // Determines recurrence relation
    let result = recursion(row - 1, col - 1) + recursion(row - 1, col);
    // Cache the calculated row, col to reduce calculation time
    memo.set(key, result);

    return result;
  };

  const ans = Array.from({ length: numRows }, () => []);

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < row + 1; col++) {
      ans[row].push(recursion(row, col));
    }
  }

  return ans;
};
