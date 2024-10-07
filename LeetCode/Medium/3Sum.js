/**
 * https://leetcode.com/problems/3sum/description/
 *
 * 1. Firstly, In order to use 3 pointers approach, we have to sort the array
 * 2. We need a array to store the result of each sum which is called `triplets`
 * 3. We iterate through the array from 0 to length - 2. Because a triplet requires 3 numbers for calculation, we want to make sure we have at least 3 numbers in the array.
 * 4. As long as the left is less than the right
 * 5. If the current sum is equal to the target sum, we push the 3 numbers that has the sum as the same the target sum into the triplets array
 * 6. If the current sum is less than the target sum, we increase the left by 1 to get higher number => higher sum
 * 7. If the current sum is greater than the target sum, we decrease the right by 1 to get the lower number => lower sum
 * 8. Because there might be some pair of duplicates triplets, we have to remove it out
 * 9. In the first while loop, we remove the duplicates of the left number (we don't need to remove the duplicate of the right number because one of left or right is invalid, then there will be invalid sum between left and right)
 * 10. In the second loop, we remove the duplicates of the current number.
 * 11. We iterate through the entire array again and return the triplets array.
 *
 * The time complexity of this solution is O(n^2) because we have a nested loop where the outer loop runs for n-2 iterations and the inner loop runs for at most n iterations.
 * The space complexity is O(n) because we are storing the triplets in an array. We could say the space complexity is O(sorting) depending on sorting algorithm
 */
const threeSum = (array) => {
  // Sort the array in ascending order
  nums.sort((a, b) => a - b);
  let triplets = [];

  // We've got nums.length - 2 because we need to have 3 pointers
  // Then that means we should have at least 3 values in the array
  for (let i = 0; i < nums.length - 2; i++) {
    const targetSum = 0;
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      let currentNumber = nums[i];
      let currentLeft = nums[left];
      let currentRight = nums[right];
      // currentSum = currentNumber + left + right
      let currentSum = currentNumber + currentLeft + currentRight;

      // If we found a sum of triplet that match the targetSum
      if (currentSum === targetSum) {
        // We add the triplet to the triplets array
        triplets.push([currentNumber, currentLeft, currentRight]);

        // Remove duplicate of the current left number
        while (left < nums.length && currentLeft === nums[left + 1]) {
          left += 1;
        }
        // And then, we increase the left pointer by 1 and decrease the right pointer by 1
        // Because currentLeft and currentRight are already in the triplet,
        // We should move to the next value to keep finding the next triplet
        left += 1;
        right -= 1;
      } else if (currentSum < targetSum) {
        // currentSum < targetSum means that we need to increase the left pointer
        // to get the higher sum, since the array is sorted
        left += 1;
      } else if (currentSum > targetSum) {
        // currentSum > targetSum means that we need to decrease the right pointer
        // to get the lower sum, since the array is sorted
        right -= 1;
      }

      // Remove duplicate of the current number
      while (i < nums.length && currentNumber === nums[i + 1]) {
        i += 1;
      }
    }
  }

  return triplets;
};

const nums = [-1, 0, 1, 2, -1, -4];

console.log(threeSumWithSet(nums)); // [[-1, -1, 2],[-1, 0, 1]]
