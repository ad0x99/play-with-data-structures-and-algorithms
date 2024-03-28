/**
 * https://leetcode.com/problems/pascals-triangle/
 *
 * 1. First row is always [1], we add the base case to the triangle.
 * 2. The first row is already added to the triangle, then we don't need to visit it again, we just need to iterate through the remaining rows which start from 1.
 * 3. We use prevRow to reference to the previous row, and because the first element is always 1, we initialize first element as 1 for the newRow array.
 * 4. As long as j < i, we calculate the inner elements.
 * 5. We calculate the sum of adjacent elements as currentSum = prevElement + currentElement, then we push the current sum to newRow array
 * 6. Out of inner loop, because the last element is always 1, we push the last element as 1 and we push new row to the final triangle
 *
 * The time complexity of this algorithm is O(numRows^2) because we have nested loops where the outer loop runs numRows times and the inner loop runs i times for each iteration of the outer loop.
 *
 * The space complexity is O(numRows^2) as well because we are storing the entire Pascal's triangle in a 2D array of size numRows x numRows. Each row contains i elements where i ranges from 1 to numRows, so the total number of elements in the triangle is roughly numRows^2.
 */
const generate = (numRows) => {
  // First row is always [1], we add the base case to the triangle
  const triangle = [[1]];

  // The first row is already added to the triangle
  // Then we don't need to visit it again
  // We just need to iterate through the remaining rows which start from 1
  for (let i = 1; i < numRows; i++) {
    // Get previous row
    let prevRow = triangle[i - 1];
    // Because the first element is always 1, we initialize first element as 1
    let newRow = [1];

    // As long as j < i, we calculate the inner elements
    for (let j = 1; j < i; j++) {
      // Calculate the sum of adjacent elements as currentSum = prevEl + currentEl
      // Then we push the current sum to newRow array
      newRow.push(prevRow[j - 1] + prevRow[j]);
    }

    // Because the last element is always 1, we push the last element as 1
    newRow.push(1);
    // And then we push new row to the final triangle
    triangle.push(newRow);
  }

  return triangle;
};

console.log(generate(5)); // [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(generate(1)); // [[1]]
