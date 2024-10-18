/**
 * https://leetcode.com/problems/bitwise-and-of-numbers-range/description/
 *
 * The idea is to find the common prefix between left and right numbers. This
 *
 * The number of leading 1s in the common prefix determines the highest power of 2 that is less than or equal to all numbers in the range. By shifting all numbers in the range by the same number of positions, their relative order within the range remains the same. This allows us to find the common prefix efficiently.
 *
 * The bitwise AND operation effectively sets all bits to 0 except for the common prefix, resulting in the final answer.
 *
 * For example: left = 5, right = 7
 *
 * Binary representation: 5 - 0101, 6 - 0110, 7 - 0111
 *
 * AND operations:
 * - 5 & 6 = 0101 & 0110 = 0100 = 4
 * - 4 & 7 = 0100 & 0111 = 0100 = 4 => final result is: 4
 *
 *  We want to find the longest sequence of leading 1s that exist in both binary representations.
 *
 * Shift both left and right one more position to the right:
 * 1. 5 >> 1 = 0101 >> 1 = 0010, 7 >> 1 = 0111 >> 1 = 0011, shiftCount = 1
 * 2. 5 >> 1 = 0010 >> 1 = 0001, 7 >> 1 = 0011 >> 1 = 0001, shiftCount = 2
 *
 * Now, both left and right are equal to 1 (binary: 0001). This means we've found the common prefix, which is a single leading 1.
 *
 * We keep track of the number of times we shifted both left and right using a shiftCount variable (in this case, 2). This represents the number of positions we need to shift the common prefix back to get the final result.
 *
 * The common prefix is 1 (binary: 0001). Shift it back by the shiftCount (2 positions) using bitwise left shift (<<): 1 << 2 (binary: 0001 << 2 = 0100)
 *
 * The bitwise AND of all numbers in the range 5 to 7 (inclusive) is 4 (represented in binary as 0100).
 *
 * Implementation:
 *
 * 1. We initialize a variable `shiftCount` to keep track of the number of positions we shift left and right.
 * 2. The bitwise AND of all numbers in the range will share a common prefix of 1s. We use a loop to find this common prefix by repeatedly shifting both left and right to the right using bitwise right shift (>>).
 * 3. As long as left and right are not equal, we keep iterating to shift the left and right until they reach the common prefix. Each iteration represents a bit position that is shared by all numbers in the range.
 * 4. After the loop, left and right will be equal to the highest power of 2 that is common to all numbers in the range. To get the final result, we shift this common prefix (left) back by the number of positions we shifted earlier (shiftCount) using bitwise left shift (<<).
 *
 *
 * Time complexity: O(log n), where n is the maximum value between left and right.
 *
 * Space complexity: O(1)
 *
 */
const rangeBitwiseAnd = (left, right) => {
  let shiftCount = 0;

  while (left !== right) {
    left = left >> 1;
    right = right >> 1;

    shiftCount++;
  }

  return left << shiftCount;
};
