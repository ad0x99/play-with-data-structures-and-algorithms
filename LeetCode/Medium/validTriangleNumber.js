/**
 * https://leetcode.com/problems/valid-triangle-number/description/
 *
 * Brute Force Approach: A valid triplet should satisfy conditions: a + b > c, b + c > a and a + c > b. We iterate through array 3 times and calculate the sum of 3 numbers that match valid triplets combination
 *
 * Time complexity: O(n) & O(n) * O(n) = O(n^3) - because there are three nested loops iterating over the input array nums
 *
 * Space complexity: O(1) - because the only extra space used is for a constant number of variables (count, i, j, k, firstNumber, secondNumber, thirdNumber, isValidTriangle).
 */
const triangleNumberBruteForce = (nums) => {
  let count = 0;

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        let firstNumber = nums[i];
        let secondNumber = nums[j];
        let thirdNumber = nums[k];

        let isValidTriangle =
          firstNumber + secondNumber > thirdNumber &&
          firstNumber + thirdNumber > secondNumber &&
          secondNumber + thirdNumber > firstNumber;

        if (isValidTriangle) {
          count += 1;
        }
      }
    }
  }

  return count;
};

// Valid combinations are: 2,3,4 (using the first 2), 2,3,4 (using the second 2), 2,2,3
console.log(triangleNumberBruteForce([2, 2, 3, 4])); // 3
console.log(triangleNumberBruteForce([4, 2, 3, 4])); // 4

/**
 *
 * Two Pointer Approach: A valid triangle should satisfy combination of a + b > c, b + c > a and a + c > b. In this solution, we will sort the array, from that, we'll have a new combination of a < b < c, then this condition b + c > a and a + c > b will be satisfied by default because c is the largest. The only condition we need to check is if a + b > c => a valid triangle.
 *
 * 1. We sort the array in ascending order.
 * 2. Declare a count variable to keep track the found valid triangle.
 * 3. We initialize the c as the last number, and iterate through the array from end to start as long as c >= 2, because we need at least 3 numbers to form a triangle.
 * 4. We start a = 0 as the leftmost number, and the b as nums.length - 2 as the rightmost number before the c.
 * 5. As long as the a < b, that means we still have number between a and b to check.
 * 6. If the current left number pluses then current right number is greater than the current c number => found a valid triangle, then we update the count by b - a (because a + b > c => any numbers between a and b will satisfy the sum which is greater than c, we don't need to check it, just update the count by the current a, b and the rest between the current a and b instead).
 * 7. Decrease b by 1 to find the next potential triangle.
 * 8. Otherwise, increase the b the move to the next potential triangle.
 * 9. We iterate the same condition as long as out of bounds and return the count result.
 *
 * Time complexity: O(n^2), where n is the number of elements in the input array `nums`. This is because we are sorting the array first, which takes O(n log n) time, and then we are using two pointers to iterate through the array in a nested loop. The inner loop has a linear time complexity of O(n), as it iterates through the array once for each element. Therefore, the overall time complexity is O(n log n + n^2), which simplifies to O(n^2).
 *
 * Space complexity: O(1) because we are only using a constant amount of space for variables like `count`, `a`, `b`, and `c`.
 */
const triangleNumberTwoPointer = (nums) => {
  nums.sort((a, b) => a - b);
  let count = 0;

  for (let c = nums.length - 1; c >= 2; c--) {
    let a = 0;
    let b = c - 1;

    while (a < b) {
      if (nums[a] + nums[b] > nums[c]) {
        count += b - a;
        b--;
      } else {
        a++;
      }
    }
  }

  return count;
};

console.log(triangleNumberTwoPointer([2, 2, 3, 4])); // 3
console.log(triangleNumberTwoPointer([4, 2, 3, 4])); // 4
