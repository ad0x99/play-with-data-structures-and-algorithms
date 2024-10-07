/**
 * https://leetcode.com/problems/number-of-1-bits/description/
 *
 * The assumption here is that the integer n is a 32-bit integer. We will iterate 32 times.
 *
 * 1. We perform a right shift (n >> i) operation on the number n by i bits. This essentially moves the bits in n i positions to the right, discarding the bits that fall off the right end.
 * 2. We perform a bitwise AND ((n >> i) & 1) operation between the result of the right shift and the number 1. This operation isolates the bit at the least significant position (rightmost bit) of the shifted value.
 * 3. We add the result of the bitwise AND operation (either 0 or 1) to the bitCount variable. If the isolated bit was 1, we add 1 to the count. If it was 0, we add 0 and doesn't change the count.
 * 4. After the loop completes (iterating 32 times), bitCount will contain the total number of bits that were 1 in the original n. We return bitCount.
 *
 * Time complexity: O(32) => O(1) - 32 is the number of bits
 *
 * Space complexity: O(1)
 */
const hammingWeight = (n) => {
  let bitCount = 0;

  for (let i = 0; i < 32; i++) {
    bitCount += (n >> i) & 1;
  }

  return bitCount;
};

/**
 *
 * The idea is using the right shift operator to count the number of 1 bits. Each time we iterate through n, we extract the first bit (rightmost bit) of it and count the bit. After that, we perform the logical right shift (>>>) the current binary to count the next rightmost bit.
 *
 * We want to use logical instead of arithmetical right shift because we want to ignore the negative number. In binary representation, a negative number always has the last (leftmost) bit is the number of 1.
 *
 * With the arithmetical right shift, each time we perform it, the number of 1 bit always be added to the leftmost position to keep the original representation. But with logical right shift, we won't keep the number of 1 bit at the leftmost position, we will replace it with 0 bit instead.
 *
 * Since we iterate as long as the n is not equal to 0, if we do the arithmetical right shift, we will have a infinity loop, because n will always not equal to 0.
 *
 * As long as the number is not equal to 0, we count the bit.
 *
 * For example: n = 11 and its binary representation = 1011
 *
 * 1011 -> rightmost bit = 1 -> bitCount += 1 -> bitCount = 1 -> right shift -> 0101
 * 0101 -> rightmost bit = 1 -> bitCount += 1 -> bitCount = 2 -> right shift -> 0010
 * 0010 -> rightmost bit = 0 -> bitCount += 0 -> bitCount = 2 -> right shift -> 0001
 * 0001 -> rightmost bit = 1 -> bitCount += 1 -> bitCount = 3 -> right shift -> 0000
 *
 * 0000 => n = 0 => end the loop
 *
 * The time complexity of this function is O(n), where n is the number of bits of input number.
 *
 * The space complexity is O(1) because the function only uses a constant amount of extra space regardless of the input size.
 */
const hammingWeight = (n) => {
  let bitCount = 0;

  while (n != 0) {
    let rightmostBit = n & 1;
    bitCount += rightmostBit;
    n = n >>> 1;
  }

  return bitCount;
};

/**
 * The idea of this function is removing each one bit from the number using AND operator, and count the number of removed one bits. This approach leverages the fact that subtracting 1 from a binary number flips the lower bits.
 *
 * By performing a bitwise AND with the result of subtracting 1, it clears all lower bits and isolates the next higher set bit (if any) for the next loop iteration.
 *
 * As long as the n number is not equal to 0, we increase bitCount by 1, and we perform AND operator between n and n - 1 to subtract the one bit from the number until we reach the number of zero.
 *
 * The line `n = n & (n - 1)` performs a bitwise AND operation between n and n - 1. Since n - 1 has all lower bits flipped and the rightmost set bit cleared, this effectively clears all the lower bits (to the right of the rightmost set bit) in n, and sets the rightmost set bit to 0.
 *
 *
 * For example: n = 11 -> binary = 1011
 *
 * - bitCount += 1 -> bitCount = 1
 * - n = 1011 -> n - 1 = 1010 -> 1011 & 1010 = 1010
 *
 * - bitCount += 1 -> bitCount = 2
 * - n = 1010 -> n - 1 = 1001 -> 1010 & 1001 = 1000
 *
 * - bitCount += 1 -> bitCount = 3
 * - n = 1000 -> n - 1 = 111 -> 1000 & 111 = 0
 *
 * Time complexity: O(n) - where n is the number of one bits
 *
 * Space complexity: O(1)
 */
const hammingWeight = (n) => {
  let bitCount = 0;

  while (n != 0) {
    bitCount += 1;
    n = n & (n - 1);
  }

  return bitCount;
};
