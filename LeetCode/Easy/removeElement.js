/**
 * https://leetcode.com/problems/remove-element/
 *
 * The idea is to using sliding window to traverse each pair of values and find the value that doesn't equal to the target value
 *
 * 1. We use a k pointer to keep track comparable value with the next value.
 * 2. Iterate through the array.
 * 3. If the current value is not equal to the target value, then we copy the current value and place it at k position. Each time we do that, we push the value to remove from left to right of the array, and the k will always hold the length of overwritten value.
 * 4. We increase k by 1 to point to the next available position.
 * 5. We iterate the entire array and do the checking again until out of bounds.
 * 6. Return k which holds the length of values that are not equal to the target.
 *
 * The time complexity of this algorithm is O(n) where n is the number of elements in the input array nums. This is because we iterate through each element of the array once.
 *
 * The space complexity of this algorithm is O(1) because we are not using any extra space that grows with the input size. We are simply modifying the input array in place.
 */
const removeElement = (nums, val) => {
  let j = 0; // pointer for overwritten elements

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[j] = nums[i]; // copy element if it's not the value to remove
      j++; // increment j to point to the next available position
    }
  }

  return j; // return the new length of the modified array
};

console.log(removeElement([3, 2, 2, 3], 3)); // 2 - nums = [2,2,_,_]
console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)); // 5 - nums = [0, 1, 4, 0, 3, _, _, _]
