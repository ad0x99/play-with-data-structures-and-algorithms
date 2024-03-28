/**
 * https://leetcode.com/problems/single-number/description/
 *
 * Approach: Using a hashmap to count the frequency of each numbers, and find out the numbers that exist once
 *
 * 1. Create a counter hashmap to store the frequency of each number.
 * 2. In the first iteration, we add the frequency of each number to the counter hashmap. If the number is already present, we plus the current number by 1 and add to the counter hashmap, otherwise we assign it to 1 as initial value.
 * 3. In the second iteration, we find the number that only exists once and return it. Otherwise, return -1.
 *
 * Time complexity: O(n) - because we iterate through the input array once to count the occurrences of each number.
 *
 * Space complexity: O(n) - because we use a counter object to store the counts of each number in the input array.
 */
const singleNumberBruteForce = (nums) => {
  let counter = {};

  for (const num of nums) {
    let count = counter[num] ? counter[num] + 1 : 1;
    counter[num] = count;
  }

  for (const count in counter) {
    if (counter[count] === 1) {
      return count;
    }
  }

  return -1;
};

/**
 * Approach: Using XOR operator to remove out the duplicates
 *
 * 1. Declare a variable result and initializes it to 0. This variable will store the result, which is the number that appears only once in the array.
 * 2. Iterate through each number
 * 3. Do XOR operation to remove the duplicates value
 * 4. XOR has the following properties: a ^ a = 0 (any number XORed with itself results in 0) and a ^ 0 = a (any number XORed with 0 remains unchanged).
 * 5. In each iteration, the current number (num) is XORed with the running.
 * 6. If a number appears twice: num ^ num = 0 (due to the first XOR property), effectively canceling out its contribution to the result.
 * 7. If a number appears only once: result ^ num (due to the second XOR property) keeps updating the result with the unique number's XOR value.
 * 8. After iterating through all numbers, the result will contain the XOR of the unique number (since all duplicates cancel out to 0). The function returns the correct result.
 *
 * Time complexity: O(n) - because we iterate through the input array once to perform the XOR operation
 *
 * Space complexity: O(1)
 */
const singleNumberWithXOR = (nums) => {
  let result = 0;

  for (const num of nums) {
    result = result ^ num;
  }

  return result;
};
