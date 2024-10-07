/**
 * https://leetcode.com/problems/search-a-2d-matrix/description/
 *
 * Brute Force Approach: We iterate through each row and col of the matrix and find the number is equal to the target
 *
 * Time complexity: O(n * m) where n is the number of rows in the matrix and m is the number of columns in the matrix.
 *
 * Space complexity: O(1)
 */
const searchMatrixBruteForce = (matrix, target) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === target) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Binary Search Approach: Each time we iterate through each row and col, we will reduce the searching area by removing corresponding row or col. We will iterate from the last col first, and move the row and col as we go through.
 *
 *
 * For example: We need to find the target = 25
 * matrix = [
 *    [1,3,5,7,9],
 *    [10,11,16,20],
 *    [23,25,34,60],
 *    [45,50,70,90],
 * ]
 *
 * In this matrix, we will start from last col of the first row, which means 9.
 *
 * First case: We compare 9 with the target, and can see that 9 < 25, that means, all the number before 9 is invalid, because, the row is sorted. We don't need to iterate through all the element before the 9. Therefore, we will move the row by 1, to go to the next potential row.
 *
 * Second case: If we reach to 60. We can see that 60 > 25, and all of the number down in the same col is in a increasing order, so we don't need to iterate through all the element of the current col. Therefore, we will reduce the col by 1, which means go to the next potential col at 34.
 *
 * We keep iterating and doing the same logic as above to find the potential target in each row and col.
 *
 * Implementation:
 *
 * 1. We initialize the row starts from 0, and the col starts from the last col of the row.
 * 2. As long as there is at least one number in the row and the col is not negative, we iterate through all the row and col.
 * 3. If the current number of the current row and col is greater than target, that means all the number in the current col is greater than target, therefore, we reduce the col by 1 to move to the next potential col.
 * 4. If the current number of the current row and col is less than the target, that means all of the number before the current row is less than target, therefore, we don't need to iterate over it, we just move to the next row to find the next potential target.
 * 5. Otherwise, if we found the target, we return true
 * 6. If there is no found target, we return false
 *
 * Time complexity: O(n + m), where n is the number of rows in the matrix and m is the number of columns. This is because in the worst case scenario, we may have to traverse through all the rows and columns of the matrix to find the target element.
 *
 * Space complexity: O(1)
 */
const searchMatrixBinarySearch = (matrix, target) => {
  let row = 0;
  let col = matrix[0].length - 1;

  while ((row < matrix.length) & (col >= 0)) {
    if (matrix[row][col] > target) {
      col -= 1;
    } else if (matrix[row][col] < target) {
      row += 1;
    } else {
      return true;
    }
  }

  return false;
};
