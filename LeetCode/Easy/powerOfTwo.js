/**
 * https://leetcode.com/problems/power-of-two/description/
 *
 * Brute Force Wit Bitwise Operator Approach
 *
 * We iterate through all possible `powers of 2` up to `2^31` (the largest positive integer a 32-bit signed integer can represent) and check if any of them match the input number n.
 *
 * We're calculating the current power of 2 using bitwise operator:
 * - The left shift operator (`<<`) is used to shift the number 1 left by i positions. This will create a number with a `1` bit at the (`i+1`)th position from the right and all other bits set to `0`.
 * - As i increases from `0` to `30`, ans will hold the values 1, 2, 4, 8, and so on, representing all possible `powers of 2` up to `2^31`.
 * - The if the calculated power of 2 (ans) is equal to the input number n, we return true, otherwise we return false.
 *
 * Time complexity: O(1)
 *
 * Space complexity: O(1)
 */
const isPowerOfTwo = (n) => {
  for (let i = 0; i < 31; i++) {
    let ans = 1 << i;

    if (ans === n) {
      return true;
    }
  }

  return false;
};

/**
 * Bit Manipulation Approach
 *
 * 1. In case the the input n is less than or equal to 0. We return false. Since powers of two are always positive integers (1, 2, 4, 8, etc.), any non-positive number cannot be a power of two.
 *
 * 2. We use a bitwise `AND` operation to check if only one bit is set in n.
 * - 2.1: We perform a bitwise AND operation between `n` and `(n - 1)`. Subtracting `1` from `n` has the effect of flipping the least significant `1` bit in `n` to `0` (all other bits remain the same).
 * - 2.3: If n is a power of two, it will only have one `1` bit set. When we perform the AND operation with `(n - 1)`, all bits except the one remaining 1 in n will become 0 (since those bits are different in `n` and `(n - 1)`). Therefore, the result of `(n & (n - 1))` will be `0` only if n has exactly one bit set, which is a characteristic of powers of two.
 *
 * 3. If n is a power of two, the bitwise check will return true, and the function returns true. Otherwise, it returns false.
 *
 * For example: n = 16 (binary: 10000)
 *
 * - n - 1 = 15 (binary: 1111)
 *
 * Perform bitwise AND:
 * - 1 0 0 0 0
 * &
 * - 0 1 1 1 1
 * - 0 0 0 0 0
 *
 * - 1 & 1 = 1 (rightmost bit)
 * - 0 & 1 = 0 (second bit from right)
 * - 0 & 1 = 0 (third bit from right)
 * - 1 & 0 = 0 (leftmost bit)
 *
 * => The result of the AND operation is 00000 (binary: 0)
 * => return true
 *
 * Time complexity: O(1)
 *
 * Space complexity: O(1)
 *
 */
const isPowerOfTwo = (n) => {
  if (n <= 0) {
    // Handle non-positive numbers (not powers of 2)
    return false;
  }

  // Check if only one bit is set (characteristic of powers of 2)
  return (n & (n - 1)) === 0;
};
