/**
 * You're given a two-dimensional array (a matrix) of distinct integers, and a target integer. Each row in the matrix is sorted, and each column is also sorted. The matrix doesn't necessarily have the same height and width.
 *
 * Write a function that returns an array of row and column indices of the target integer if it's contained in the matrix. Otherwise, return [-1, -1]
 *
 * Example Input:
 * matrix = [
 *    [1, 4, 7, 12, 15, 1000],
 *    [2, 5, 19, 31, 32, 1001],
 *    [3, 8, 24, 33, 35, 1002],
 *    [40, 41, 42, 44, 45, 1003],
 *    [99, 100, 103, 106, 128, 1004],
 * ]
 *
 * Sample Output:
 * [3, 3]
 */

/**
 * Brute Force Approach: We iterate through each row and col of the matrix and find the number is equal to the target
 *
 * Time complexity: O(n * m) where n is the number of rows in the matrix and m is the number of columns in the matrix.
 *
 * Space complexity: O(1)
 */
const searchInSortedMatrix = (matrix, target) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === target) {
        return [row, col];
      }
    }
  }

  return [-1, -1];
};

/**
 * Binary Search Approach: Each time we iterate through each row and col, we will reduce the searching area by removing corresponding row or col.
 * We will iterate from the last col first, and move the row and col as we go through.
 *
 * For example: We need to find the target = 44
 * matrix = [
 *    [1, 4, 7, 12, 15, 1000],
 *    [2, 5, 19, 31, 32, 1001],
 *    [3, 8, 24, 33, 35, 1002],
 *    [40, 41, 42, 44, 45, 1003],
 *    [99, 100, 103, 106, 128, 1004],
 * ]
 *
 * In this matrix, we will start from last col of the first row, which means 1000.
 *
 * We can see that 1000 > 44, and all of the number down in the same col is in a increasing order, so we don't need to iterate through all the element of the current col. Therefore, we will reduce the col by 1, which means go to the next potential col at 15.
 *
 * Next step, we compare 15 with the target, and can see that 15 < 44, that means, all the number before 15 is invalid, because, the row is sorted. We don't need to iterate through all the element before the 15. Therefore, we will move the row by 1, to go to the next potential row.
 *
 * We keep iterating and doing the same logic as above to find the potential target in each row and col.
 *
 * Implementation:
 *
 * 1. We initialize the row starts from 0, and the col starts from the last col of the row.
 * 2. As long as there is at least one number in the row and the col is not negative, we iterate through all the row and col.
 * 3. If the current number of the current row and col is greater than target, that means all the number in the current col is greater than target, therefore, we reduce the col by 1 to move to the next potential col.
 * 4. If the current number of the current row and col is less than the target, that means all of the number before the current row is less than target, therefore, we don't need to iterate over it, we just move to the next row to find the next potential target.
 * 5. Otherwise, if we found the target, we return its row and col indexes.
 * 6. If there is no found target, we return [-1, -1]
 *
 * Time complexity: O(n + m), where n is the number of rows in the matrix and m is the number of columns. This is because in the worst case scenario, we may have to traverse through all the rows and columns of the matrix to find the target element.
 *
 * Space complexity: O(1)
 */
const searchInSortedMatrix = (matrix, target) => {
  let row = 0;
  let col = matrix[0].length - 1;

  while ((row < matrix.length) & (col >= 0)) {
    if (matrix[row][col] > target) {
      col -= 1;
    } else if (matrix[row][col] < target) {
      row += 1;
    } else {
      return [row, col];
    }
  }

  return [-1, -1];
};
