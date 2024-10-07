/**
 * https://leetcode.com/problems/single-number-ii/description/
 *
 * Map Approach: The idea is counting the frequency of each element, and find out the element has the frequency is equal to one.
 *
 * 1. We initialize a frequencies map to store the frequency of each element.
 * 2. We iterate through each element and count the frequency.
 * 3. After counting the frequency, we iterate through the frequencies map and find the element has the frequency is equal to one and return it.
 * 4. Otherwise, we return -1.
 *
 * Time complexity: O(n) + O(n) = O(2n) = O(n) - where n is the length of the nums array and frequencies map.
 *
 * Space complexity: O(n) - where n is the length of the frequencies map
 */
const singleNumber = (nums) => {
  let frequencies = new Map();

  for (const num of nums) {
    let count = frequencies.get(num) ? frequencies.get(num) + 1 : 1;
    frequencies.set(num, count);
  }

  for (const frequency of frequencies) {
    if (frequency[1] === 1) {
      return frequency[0];
    }
  }

  return -1;
};

/**
 * Bitwise Operation Approach
 *
 * The idea is that we iterate through each bit position and count the occurrences of the corresponding bit value (0 or 1) across all elements. By leveraging the fact that the single element will have unique bits that appear only once, we will identify those bits and build the final result by setting the corresponding bits in the ans variable. This approach avoids using XOR operations but relies on counting occurrences for each bit position.
 *
 * 1. We initialize a variable ans to store the final result (the single element).
 * 2. In the outer loop, we iterate through all possible bit positions (0 to 31) in a 32-bit integer. This is because we're considering all possible bits that could be different for the single element.
 * 3. In the inner loop, we iterate through each element in the array.`
 * 4. We check if the bit at position `bit` in the current element (nums[i]) is set to 1.
 * - 4.1: The `1 << bit` operation: This performs a `left shift` operation on 1 by bit positions. This creates a number with a single 1 at the bitth position from the right.
 * - 4.2: The `&` operation: This performs a bitwise `AND` operation between the current element and the shifted value (`1 << bit`). The result will be 1 only if the bit at position bit in the element is also 1.
 * - 4.3: if (nums[i] & (`1 << bit`)): This checks if the bit at position bit in the current element (nums[i]) is set to 1.
 * - 4.4: If the bit at position bit is 1 in the current element, the count variable is incremented. This keeps track of how many times a specific bit value (0 or 1) appears at that position across all elements.
 *
 * 5. If the count (number of occurrences) for the current bit position (bit) is equal to 1 modulo 3. Since every other element appears three times, any bit that appears once in the single element will have a count of 1 after iterating through all elements. Bits that appear in elements appearing twice or three times will have a count that is a multiple of 3.
 * - 5.1: If the count is 1, we set the corresponding bit in the ans variable.
 * - 5.2: The `1 << bit` operation creates a number with a single 1 at the `bitth` position from the right.
 * - 5.3: The `|` operation performs a bitwise `OR` operation between the current value of ans and the shifted value (`1 << bit`). This operation essentially sets the bit at position bit in ans to 1, effectively building the single element based on the bits that appear only once.
 *
 * 6. After iterating through all bit positions, the ans variable will contain the single element where each bit position reflects the bit value that appeared only once in the original array. We return the ans variable as the single element.
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(1)
 *
 */
const singleNumber = (nums) => {
  let ans = 0;

  for (let bit = 0; bit <= 31; bit++) {
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
      if (nums[i] & (1 << bit)) {
        count++;
      }
    }

    if (count % 3 === 1) {
      ans = ans | (1 << bit);
    }
  }

  return ans;
};

/**
 * Bitwise Operation Approach
 *
 * The idea behind the bit manipulation solution for finding the single element in an array (where others appear three times) leverages the concept of tracking bit occurrences.
 *
 * In the given scenario, every element appears three times except for one. This means any bit position in the single element will either have a:
 * - `0`: If the corresponding bit in all other elements is also 0 (appears three times as 0).
 * - `1`: If the corresponding bit in all other elements is a mix of 1s and 0s (two 1s and one 0, or two 0s and one 1), effectively canceling each other out.
 *
 * The XOR (^) operation returns 1 if the corresponding bits in the operands are different and 0 if they are the same.
 *
 * We can use two variables, ones and twos, to track the occurrence count of bits that appear once and twice, respectively.
 *
 * For each element (num) in the array: We perform an XOR operation between the current element (num) and the ones variable:
 * - If a specific bit in num appears once (and doesn't appear in ones yet), the XOR will set that bit to 1 in ones.
 * - If a specific bit in num appears twice (and already exists in ones), the XOR will clear that bit in ones (as the second occurrence cancels out the first).
 *
 * We then introduce a twist: We perform a bitwise AND operation (&) with the inverted (~) twos variable. This ensures that any bits set in ones that also appear twice (and are now set in twos) are cleared in ones. This effectively isolates bits that appear only once in ones.
 *
 * We perform a similar logic for twos: `XOR` num with twos to capture bits that appear twice for the first time. `AND` with inverted ones to ensure only bits appearing twice in num (not already in ones) are set in twos.
 *
 * After iterating through all elements:
 * - ones will contain the bitwise AND of the single element and any bits that appeared once (which will be cleared due to XOR with itself). Since only one element appears once, ones will contain the single element.
 * - twos will ideally be empty (as all bits appearing twice should be cleared).
 *
 * Implementation:
 *
 * 1. We initialize 2 variables, the `ones` variable will store the bitwise `AND` of the single element and any bits that have appeared once so far and the `twos` will store the bitwise `AND` of the single element and any bits that have appeared twice so far.
 * 2. We iterate through each element.
 * 3. We perform two operations simultaneously using bitwise AND (&) and bitwise NOT (~) for both `ones` and `twos` results with the current element.
 * 4. With the calculation of the `ones` variable.
 * - 4.1: With this operation `ones ^ num`, we calculate the XOR of the current element (num) and the ones variable. This captures any bits that are 1 in both the current element and any previously encountered ones (bits that appeared once so far).
 * - 4.1: With this operation `~twos`: we invert all the bits in the twos variable using bitwise NOT. And then combining them with `&` operation to perform a bitwise `AND` of the `XOR` result and the inverted twos. This ensures that any bits that have appeared twice (present in both the XOR result and the inverted `twos`) are cleared in `ones`. Only the bit that appears once (present in the XOR result but not in the inverted twos) will remain set to 1 in ones.
 *
 * 5. With the calculation of the `twos` variable
 * - 5.1: With this operation `twos ^ num`, we calculate the XOR of the current element (num) and the twos variable. This captures any bits that are 1 in both the current element and any previously encountered twos (bits that appeared twice so far).
 * - 5.2 With this operation `~ones`, we invert all the bits in the ones variable, and then combining them with `&` operation to perform a bitwise `AND` of the `XOR` result and the inverted ones. This ensures that any bits that have appeared twice (present in both the XOR result and the inverted ones) are cleared in twos. Only the bit that appears twice for the first time (present in the XOR result but not in the inverted ones) will be set to 1 in twos.
 *
 * 6. We return the `ones` variable as the result.
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(1)
 *
 */
const singleNumberBit = (nums) => {
  let ones = 0;
  let twos = 0;

  for (let num of nums) {
    ones = (ones ^ num) & ~twos;
    twos = (twos ^ num) & ~ones;
  }

  return ones;
};
