/**
 * The function `twoSum` takes an array of numbers `nums` and a target number `target`, and returns an
 * array of two indices where the numbers at those indices in `nums` add up to the target.
 * @param nums - An array of numbers.
 * @param target - The target parameter is the desired sum that we want to find using two numbers from
 * the nums array.
 * @returns The function `twoSum` returns an array containing the indices of the two numbers in the
 * `nums` array that add up to the `target` value.
 *
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
const twoSum = (nums, target) => {
  let temp = {};

  for (let i = 0; i < nums.length; i++) {
    /* Checks if the current number `nums[i]` exists as a key in the
   `temp` object. If it does, it means that we have already encountered a number in the `nums` array
   that, when added to the current number, gives the target sum. In this case, we return an array
   containing the index of the previously encountered number (stored as the value in the `temp`
   object) and the current index `i`. This gives us the indices of the two numbers in the `nums`
   array that add up to the target value. */
    if (temp[nums[i]] >= 0) {
      return [temp[nums[i]], i];
    }

    /* Store the index `i` of the current number `nums[i]`
    in the `temp` object. */
    temp[target - nums[i]] = i;
  }
};

console.log(twoSum([2, 11, 7, 15], 9));
console.log(twoSum([3, 2, 4], 6));
console.log(twoSum([3, 3], 6));
